(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory()
    : typeof define === "function" && define.amd
    ? define(factory)
    : factory();
})(this, function () {
  "use strict";

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * True if the custom elements polyfill is in use.
   */
  const isCEPolyfill =
    typeof window !== "undefined" &&
    window.customElements != null &&
    window.customElements.polyfillWrapFlushCallback !== undefined;
  /**
   * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
   * `container`.
   */
  const removeNodes = (container, start, end = null) => {
    while (start !== end) {
      const n = start.nextSibling;
      container.removeChild(start);
      start = n;
    }
  };
  //# sourceMappingURL=dom.js.map

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * An expression marker with embedded unique key to avoid collision with
   * possible text in templates.
   */
  const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
  /**
   * An expression marker used text-positions, multi-binding attributes, and
   * attributes with markup-like text values.
   */
  const nodeMarker = `<!--${marker}-->`;
  const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
  /**
   * Suffix appended to all bound attribute names.
   */
  const boundAttributeSuffix = "$lit$";
  /**
   * An updatable Template that tracks the location of dynamic parts.
   */
  class Template {
    constructor(result, element) {
      this.parts = [];
      this.element = element;
      const nodesToRemove = [];
      const stack = [];
      // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
      const walker = document.createTreeWalker(
        element.content,
        133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */,
        null,
        false
      );
      // Keeps track of the last index associated with a part. We try to delete
      // unnecessary nodes, but we never want to associate two different parts
      // to the same index. They must have a constant node between.
      let lastPartIndex = 0;
      let index = -1;
      let partIndex = 0;
      const {
        strings,
        values: { length },
      } = result;
      while (partIndex < length) {
        const node = walker.nextNode();
        if (node === null) {
          // We've exhausted the content inside a nested template element.
          // Because we still have parts (the outer for-loop), we know:
          // - There is a template in the stack
          // - The walker will find a nextNode outside the template
          walker.currentNode = stack.pop();
          continue;
        }
        index++;
        if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
          if (node.hasAttributes()) {
            const attributes = node.attributes;
            const { length } = attributes;
            // Per
            // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
            // attributes are not guaranteed to be returned in document order.
            // In particular, Edge/IE can return them out of order, so we cannot
            // assume a correspondence between part index and attribute index.
            let count = 0;
            for (let i = 0; i < length; i++) {
              if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                count++;
              }
            }
            while (count-- > 0) {
              // Get the template literal section leading up to the first
              // expression in this attribute
              const stringForPart = strings[partIndex];
              // Find the attribute name
              const name = lastAttributeNameRegex.exec(stringForPart)[2];
              // Find the corresponding attribute
              // All bound attributes have had a suffix added in
              // TemplateResult#getHTML to opt out of special attribute
              // handling. To look up the attribute value we also need to add
              // the suffix.
              const attributeLookupName =
                name.toLowerCase() + boundAttributeSuffix;
              const attributeValue = node.getAttribute(attributeLookupName);
              node.removeAttribute(attributeLookupName);
              const statics = attributeValue.split(markerRegex);
              this.parts.push({
                type: "attribute",
                index,
                name,
                strings: statics,
              });
              partIndex += statics.length - 1;
            }
          }
          if (node.tagName === "TEMPLATE") {
            stack.push(node);
            walker.currentNode = node.content;
          }
        } else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
          const data = node.data;
          if (data.indexOf(marker) >= 0) {
            const parent = node.parentNode;
            const strings = data.split(markerRegex);
            const lastIndex = strings.length - 1;
            // Generate a new text node for each literal section
            // These nodes are also used as the markers for node parts
            for (let i = 0; i < lastIndex; i++) {
              let insert;
              let s = strings[i];
              if (s === "") {
                insert = createMarker();
              } else {
                const match = lastAttributeNameRegex.exec(s);
                if (
                  match !== null &&
                  endsWith(match[2], boundAttributeSuffix)
                ) {
                  s =
                    s.slice(0, match.index) +
                    match[1] +
                    match[2].slice(0, -boundAttributeSuffix.length) +
                    match[3];
                }
                insert = document.createTextNode(s);
              }
              parent.insertBefore(insert, node);
              this.parts.push({ type: "node", index: ++index });
            }
            // If there's no text, we must insert a comment to mark our place.
            // Else, we can trust it will stick around after cloning.
            if (strings[lastIndex] === "") {
              parent.insertBefore(createMarker(), node);
              nodesToRemove.push(node);
            } else {
              node.data = strings[lastIndex];
            }
            // We have a part for each match found
            partIndex += lastIndex;
          }
        } else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
          if (node.data === marker) {
            const parent = node.parentNode;
            // Add a new marker node to be the startNode of the Part if any of
            // the following are true:
            //  * We don't have a previousSibling
            //  * The previousSibling is already the start of a previous part
            if (node.previousSibling === null || index === lastPartIndex) {
              index++;
              parent.insertBefore(createMarker(), node);
            }
            lastPartIndex = index;
            this.parts.push({ type: "node", index });
            // If we don't have a nextSibling, keep this node so we have an end.
            // Else, we can remove it to save future costs.
            if (node.nextSibling === null) {
              node.data = "";
            } else {
              nodesToRemove.push(node);
              index--;
            }
            partIndex++;
          } else {
            let i = -1;
            while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
              // Comment node has a binding marker inside, make an inactive part
              // The binding won't work, but subsequent bindings will
              // TODO (justinfagnani): consider whether it's even worth it to
              // make bindings in comments work
              this.parts.push({ type: "node", index: -1 });
              partIndex++;
            }
          }
        }
      }
      // Remove text binding nodes after the walk to not disturb the TreeWalker
      for (const n of nodesToRemove) {
        n.parentNode.removeChild(n);
      }
    }
  }
  const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
  };
  const isTemplatePartActive = (part) => part.index !== -1;
  // Allows `document.createComment('')` to be renamed for a
  // small manual size-savings.
  const createMarker = () => document.createComment("");
  /**
   * This regex extracts the attribute name preceding an attribute-position
   * expression. It does this by matching the syntax allowed for attributes
   * against the string literal directly preceding the expression, assuming that
   * the expression is in an attribute-value position.
   *
   * See attributes in the HTML spec:
   * https://www.w3.org/TR/html5/syntax.html#elements-attributes
   *
   * " \x09\x0a\x0c\x0d" are HTML space characters:
   * https://www.w3.org/TR/html5/infrastructure.html#space-characters
   *
   * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
   * space character except " ".
   *
   * So an attribute is:
   *  * The name: any character except a control character, space character, ('),
   *    ("), ">", "=", or "/"
   *  * Followed by zero or more space characters
   *  * Followed by "="
   *  * Followed by zero or more space characters
   *  * Followed by:
   *    * Any character except space, ('), ("), "<", ">", "=", (`), or
   *    * (") then any non-("), or
   *    * (') then any non-(')
   */
  const lastAttributeNameRegex =
    // eslint-disable-next-line no-control-regex
    /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
  //# sourceMappingURL=template.js.map

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const walkerNodeFilter = 133; /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
  /**
   * Removes the list of nodes from a Template safely. In addition to removing
   * nodes from the Template, the Template part indices are updated to match
   * the mutated Template DOM.
   *
   * As the template is walked the removal state is tracked and
   * part indices are adjusted as needed.
   *
   * div
   *   div#1 (remove) <-- start removing (removing node is div#1)
   *     div
   *       div#2 (remove)  <-- continue removing (removing node is still div#1)
   *         div
   * div <-- stop removing since previous sibling is the removing node (div#1,
   * removed 4 nodes)
   */
  function removeNodesFromTemplate(template, nodesToRemove) {
    const {
      element: { content },
      parts,
    } = template;
    const walker = document.createTreeWalker(
      content,
      walkerNodeFilter,
      null,
      false
    );
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let part = parts[partIndex];
    let nodeIndex = -1;
    let removeCount = 0;
    const nodesToRemoveInTemplate = [];
    let currentRemovingNode = null;
    while (walker.nextNode()) {
      nodeIndex++;
      const node = walker.currentNode;
      // End removal if stepped past the removing node
      if (node.previousSibling === currentRemovingNode) {
        currentRemovingNode = null;
      }
      // A node to remove was found in the template
      if (nodesToRemove.has(node)) {
        nodesToRemoveInTemplate.push(node);
        // Track node we're removing
        if (currentRemovingNode === null) {
          currentRemovingNode = node;
        }
      }
      // When removing, increment count by which to adjust subsequent part indices
      if (currentRemovingNode !== null) {
        removeCount++;
      }
      while (part !== undefined && part.index === nodeIndex) {
        // If part is in a removed node deactivate it by setting index to -1 or
        // adjust the index as needed.
        part.index =
          currentRemovingNode !== null ? -1 : part.index - removeCount;
        // go to the next active part.
        partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        part = parts[partIndex];
      }
    }
    nodesToRemoveInTemplate.forEach((n) => n.parentNode.removeChild(n));
  }
  const countNodes = (node) => {
    let count = node.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */ ? 0 : 1;
    const walker = document.createTreeWalker(
      node,
      walkerNodeFilter,
      null,
      false
    );
    while (walker.nextNode()) {
      count++;
    }
    return count;
  };
  const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
    for (let i = startIndex + 1; i < parts.length; i++) {
      const part = parts[i];
      if (isTemplatePartActive(part)) {
        return i;
      }
    }
    return -1;
  };
  /**
   * Inserts the given node into the Template, optionally before the given
   * refNode. In addition to inserting the node into the Template, the Template
   * part indices are updated to match the mutated Template DOM.
   */
  function insertNodeIntoTemplate(template, node, refNode = null) {
    const {
      element: { content },
      parts,
    } = template;
    // If there's no refNode, then put node at end of template.
    // No part indices need to be shifted in this case.
    if (refNode === null || refNode === undefined) {
      content.appendChild(node);
      return;
    }
    const walker = document.createTreeWalker(
      content,
      walkerNodeFilter,
      null,
      false
    );
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let insertCount = 0;
    let walkerIndex = -1;
    while (walker.nextNode()) {
      walkerIndex++;
      const walkerNode = walker.currentNode;
      if (walkerNode === refNode) {
        insertCount = countNodes(node);
        refNode.parentNode.insertBefore(node, refNode);
      }
      while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
        // If we've inserted the node, simply adjust all subsequent parts
        if (insertCount > 0) {
          while (partIndex !== -1) {
            parts[partIndex].index += insertCount;
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
          }
          return;
        }
        partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
      }
    }
  }
  //# sourceMappingURL=modify-template.js.map

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const directives = new WeakMap();
  /**
   * Brands a function as a directive factory function so that lit-html will call
   * the function during template rendering, rather than passing as a value.
   *
   * A _directive_ is a function that takes a Part as an argument. It has the
   * signature: `(part: Part) => void`.
   *
   * A directive _factory_ is a function that takes arguments for data and
   * configuration and returns a directive. Users of directive usually refer to
   * the directive factory as the directive. For example, "The repeat directive".
   *
   * Usually a template author will invoke a directive factory in their template
   * with relevant arguments, which will then return a directive function.
   *
   * Here's an example of using the `repeat()` directive factory that takes an
   * array and a function to render an item:
   *
   * ```js
   * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
   * ```
   *
   * When `repeat` is invoked, it returns a directive function that closes over
   * `items` and the template function. When the outer template is rendered, the
   * return directive function is called with the Part for the expression.
   * `repeat` then performs it's custom logic to render multiple items.
   *
   * @param f The directive factory function. Must be a function that returns a
   * function of the signature `(part: Part) => void`. The returned function will
   * be called with the part object.
   *
   * @example
   *
   * import {directive, html} from 'lit-html';
   *
   * const immutable = directive((v) => (part) => {
   *   if (part.value !== v) {
   *     part.setValue(v)
   *   }
   * });
   */
  const directive = (f) => (...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
  };
  const isDirective = (o) => {
    return typeof o === "function" && directives.has(o);
  };
  //# sourceMappingURL=directive.js.map

  /**
   * @license
   * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * A sentinel value that signals that a value was handled by a directive and
   * should not be written to the DOM.
   */
  const noChange = {};
  /**
   * A sentinel value that signals a NodePart to fully clear its content.
   */
  const nothing = {};
  //# sourceMappingURL=part.js.map

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * An instance of a `Template` that can be attached to the DOM and updated
   * with new values.
   */
  class TemplateInstance {
    constructor(template, processor, options) {
      this.__parts = [];
      this.template = template;
      this.processor = processor;
      this.options = options;
    }
    update(values) {
      let i = 0;
      for (const part of this.__parts) {
        if (part !== undefined) {
          part.setValue(values[i]);
        }
        i++;
      }
      for (const part of this.__parts) {
        if (part !== undefined) {
          part.commit();
        }
      }
    }
    _clone() {
      // There are a number of steps in the lifecycle of a template instance's
      // DOM fragment:
      //  1. Clone - create the instance fragment
      //  2. Adopt - adopt into the main document
      //  3. Process - find part markers and create parts
      //  4. Upgrade - upgrade custom elements
      //  5. Update - set node, attribute, property, etc., values
      //  6. Connect - connect to the document. Optional and outside of this
      //     method.
      //
      // We have a few constraints on the ordering of these steps:
      //  * We need to upgrade before updating, so that property values will pass
      //    through any property setters.
      //  * We would like to process before upgrading so that we're sure that the
      //    cloned fragment is inert and not disturbed by self-modifying DOM.
      //  * We want custom elements to upgrade even in disconnected fragments.
      //
      // Given these constraints, with full custom elements support we would
      // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
      //
      // But Safari does not implement CustomElementRegistry#upgrade, so we
      // can not implement that order and still have upgrade-before-update and
      // upgrade disconnected fragments. So we instead sacrifice the
      // process-before-upgrade constraint, since in Custom Elements v1 elements
      // must not modify their light DOM in the constructor. We still have issues
      // when co-existing with CEv0 elements like Polymer 1, and with polyfills
      // that don't strictly adhere to the no-modification rule because shadow
      // DOM, which may be created in the constructor, is emulated by being placed
      // in the light DOM.
      //
      // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
      // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
      // in one step.
      //
      // The Custom Elements v1 polyfill supports upgrade(), so the order when
      // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
      // Connect.
      const fragment = isCEPolyfill
        ? this.template.element.content.cloneNode(true)
        : document.importNode(this.template.element.content, true);
      const stack = [];
      const parts = this.template.parts;
      // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
      const walker = document.createTreeWalker(
        fragment,
        133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */,
        null,
        false
      );
      let partIndex = 0;
      let nodeIndex = 0;
      let part;
      let node = walker.nextNode();
      // Loop through all the nodes and parts of a template
      while (partIndex < parts.length) {
        part = parts[partIndex];
        if (!isTemplatePartActive(part)) {
          this.__parts.push(undefined);
          partIndex++;
          continue;
        }
        // Progress the tree walker until we find our next part's node.
        // Note that multiple parts may share the same node (attribute parts
        // on a single element), so this loop may not run at all.
        while (nodeIndex < part.index) {
          nodeIndex++;
          if (node.nodeName === "TEMPLATE") {
            stack.push(node);
            walker.currentNode = node.content;
          }
          if ((node = walker.nextNode()) === null) {
            // We've exhausted the content inside a nested template element.
            // Because we still have parts (the outer for-loop), we know:
            // - There is a template in the stack
            // - The walker will find a nextNode outside the template
            walker.currentNode = stack.pop();
            node = walker.nextNode();
          }
        }
        // We've arrived at our part's node.
        if (part.type === "node") {
          const part = this.processor.handleTextExpression(this.options);
          part.insertAfterNode(node.previousSibling);
          this.__parts.push(part);
        } else {
          this.__parts.push(
            ...this.processor.handleAttributeExpressions(
              node,
              part.name,
              part.strings,
              this.options
            )
          );
        }
        partIndex++;
      }
      if (isCEPolyfill) {
        document.adoptNode(fragment);
        customElements.upgrade(fragment);
      }
      return fragment;
    }
  }
  //# sourceMappingURL=template-instance.js.map

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const commentMarker = ` ${marker} `;
  /**
   * The return type of `html`, which holds a Template and the values from
   * interpolated expressions.
   */
  class TemplateResult {
    constructor(strings, values, type, processor) {
      this.strings = strings;
      this.values = values;
      this.type = type;
      this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
      const l = this.strings.length - 1;
      let html = "";
      let isCommentBinding = false;
      for (let i = 0; i < l; i++) {
        const s = this.strings[i];
        // For each binding we want to determine the kind of marker to insert
        // into the template source before it's parsed by the browser's HTML
        // parser. The marker type is based on whether the expression is in an
        // attribute, text, or comment position.
        //   * For node-position bindings we insert a comment with the marker
        //     sentinel as its text content, like <!--{{lit-guid}}-->.
        //   * For attribute bindings we insert just the marker sentinel for the
        //     first binding, so that we support unquoted attribute bindings.
        //     Subsequent bindings can use a comment marker because multi-binding
        //     attributes must be quoted.
        //   * For comment bindings we insert just the marker sentinel so we don't
        //     close the comment.
        //
        // The following code scans the template source, but is *not* an HTML
        // parser. We don't need to track the tree structure of the HTML, only
        // whether a binding is inside a comment, and if not, if it appears to be
        // the first binding in an attribute.
        const commentOpen = s.lastIndexOf("<!--");
        // We're in comment position if we have a comment open with no following
        // comment close. Because <-- can appear in an attribute value there can
        // be false positives.
        isCommentBinding =
          (commentOpen > -1 || isCommentBinding) &&
          s.indexOf("-->", commentOpen + 1) === -1;
        // Check to see if we have an attribute-like sequence preceding the
        // expression. This can match "name=value" like structures in text,
        // comments, and attribute values, so there can be false-positives.
        const attributeMatch = lastAttributeNameRegex.exec(s);
        if (attributeMatch === null) {
          // We're only in this branch if we don't have a attribute-like
          // preceding sequence. For comments, this guards against unusual
          // attribute values like <div foo="<!--${'bar'}">. Cases like
          // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
          // below.
          html += s + (isCommentBinding ? commentMarker : nodeMarker);
        } else {
          // For attributes we use just a marker sentinel, and also append a
          // $lit$ suffix to the name to opt-out of attribute-specific parsing
          // that IE and Edge do for style and certain SVG attributes.
          html +=
            s.substr(0, attributeMatch.index) +
            attributeMatch[1] +
            attributeMatch[2] +
            boundAttributeSuffix +
            attributeMatch[3] +
            marker;
        }
      }
      html += this.strings[l];
      return html;
    }
    getTemplateElement() {
      const template = document.createElement("template");
      template.innerHTML = this.getHTML();
      return template;
    }
  }
  //# sourceMappingURL=template-result.js.map

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const isPrimitive = (value) => {
    return (
      value === null ||
      !(typeof value === "object" || typeof value === "function")
    );
  };
  const isIterable = (value) => {
    return (
      Array.isArray(value) ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !!(value && value[Symbol.iterator])
    );
  };
  /**
   * Writes attribute values to the DOM for a group of AttributeParts bound to a
   * single attribute. The value is only set once even if there are multiple parts
   * for an attribute.
   */
  class AttributeCommitter {
    constructor(element, name, strings) {
      this.dirty = true;
      this.element = element;
      this.name = name;
      this.strings = strings;
      this.parts = [];
      for (let i = 0; i < strings.length - 1; i++) {
        this.parts[i] = this._createPart();
      }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
      return new AttributePart(this);
    }
    _getValue() {
      const strings = this.strings;
      const l = strings.length - 1;
      let text = "";
      for (let i = 0; i < l; i++) {
        text += strings[i];
        const part = this.parts[i];
        if (part !== undefined) {
          const v = part.value;
          if (isPrimitive(v) || !isIterable(v)) {
            text += typeof v === "string" ? v : String(v);
          } else {
            for (const t of v) {
              text += typeof t === "string" ? t : String(t);
            }
          }
        }
      }
      text += strings[l];
      return text;
    }
    commit() {
      if (this.dirty) {
        this.dirty = false;
        this.element.setAttribute(this.name, this._getValue());
      }
    }
  }
  /**
   * A Part that controls all or part of an attribute value.
   */
  class AttributePart {
    constructor(committer) {
      this.value = undefined;
      this.committer = committer;
    }
    setValue(value) {
      if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
        this.value = value;
        // If the value is a not a directive, dirty the committer so that it'll
        // call setAttribute. If the value is a directive, it'll dirty the
        // committer if it calls setValue().
        if (!isDirective(value)) {
          this.committer.dirty = true;
        }
      }
    }
    commit() {
      while (isDirective(this.value)) {
        const directive$$1 = this.value;
        this.value = noChange;
        directive$$1(this);
      }
      if (this.value === noChange) {
        return;
      }
      this.committer.commit();
    }
  }
  /**
   * A Part that controls a location within a Node tree. Like a Range, NodePart
   * has start and end locations and can set and update the Nodes between those
   * locations.
   *
   * NodeParts support several value types: primitives, Nodes, TemplateResults,
   * as well as arrays and iterables of those types.
   */
  class NodePart {
    constructor(options) {
      this.value = undefined;
      this.__pendingValue = undefined;
      this.options = options;
    }
    /**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
      this.startNode = container.appendChild(createMarker());
      this.endNode = container.appendChild(createMarker());
    }
    /**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
      this.startNode = ref;
      this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
      part.__insert((this.startNode = createMarker()));
      part.__insert((this.endNode = createMarker()));
    }
    /**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
      ref.__insert((this.startNode = createMarker()));
      this.endNode = ref.endNode;
      ref.endNode = this.startNode;
    }
    setValue(value) {
      this.__pendingValue = value;
    }
    commit() {
      if (this.startNode.parentNode === null) {
        return;
      }
      while (isDirective(this.__pendingValue)) {
        const directive$$1 = this.__pendingValue;
        this.__pendingValue = noChange;
        directive$$1(this);
      }
      const value = this.__pendingValue;
      if (value === noChange) {
        return;
      }
      if (isPrimitive(value)) {
        if (value !== this.value) {
          this.__commitText(value);
        }
      } else if (value instanceof TemplateResult) {
        this.__commitTemplateResult(value);
      } else if (value instanceof Node) {
        this.__commitNode(value);
      } else if (isIterable(value)) {
        this.__commitIterable(value);
      } else if (value === nothing) {
        this.value = nothing;
        this.clear();
      } else {
        // Fallback, will render the string representation
        this.__commitText(value);
      }
    }
    __insert(node) {
      this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
      if (this.value === value) {
        return;
      }
      this.clear();
      this.__insert(value);
      this.value = value;
    }
    __commitText(value) {
      const node = this.startNode.nextSibling;
      value = value == null ? "" : value;
      // If `value` isn't already a string, we explicitly convert it here in case
      // it can't be implicitly converted - i.e. it's a symbol.
      const valueAsString = typeof value === "string" ? value : String(value);
      if (
        node === this.endNode.previousSibling &&
        node.nodeType === 3 /* Node.TEXT_NODE */
      ) {
        // If we only have a single text node between the markers, we can just
        // set its value, rather than replacing it.
        // TODO(justinfagnani): Can we just check if this.value is primitive?
        node.data = valueAsString;
      } else {
        this.__commitNode(document.createTextNode(valueAsString));
      }
      this.value = value;
    }
    __commitTemplateResult(value) {
      const template = this.options.templateFactory(value);
      if (
        this.value instanceof TemplateInstance &&
        this.value.template === template
      ) {
        this.value.update(value.values);
      } else {
        // Make sure we propagate the template processor from the TemplateResult
        // so that we use its syntax extension, etc. The template factory comes
        // from the render function options so that it can control template
        // caching and preprocessing.
        const instance = new TemplateInstance(
          template,
          value.processor,
          this.options
        );
        const fragment = instance._clone();
        instance.update(value.values);
        this.__commitNode(fragment);
        this.value = instance;
      }
    }
    __commitIterable(value) {
      // For an Iterable, we create a new InstancePart per item, then set its
      // value to the item. This is a little bit of overhead for every item in
      // an Iterable, but it lets us recurse easily and efficiently update Arrays
      // of TemplateResults that will be commonly returned from expressions like:
      // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
      // If _value is an array, then the previous render was of an
      // iterable and _value will contain the NodeParts from the previous
      // render. If _value is not an array, clear this part and make a new
      // array for NodeParts.
      if (!Array.isArray(this.value)) {
        this.value = [];
        this.clear();
      }
      // Lets us keep track of how many items we stamped so we can clear leftover
      // items from a previous render
      const itemParts = this.value;
      let partIndex = 0;
      let itemPart;
      for (const item of value) {
        // Try to reuse an existing part
        itemPart = itemParts[partIndex];
        // If no existing part, create a new one
        if (itemPart === undefined) {
          itemPart = new NodePart(this.options);
          itemParts.push(itemPart);
          if (partIndex === 0) {
            itemPart.appendIntoPart(this);
          } else {
            itemPart.insertAfterPart(itemParts[partIndex - 1]);
          }
        }
        itemPart.setValue(item);
        itemPart.commit();
        partIndex++;
      }
      if (partIndex < itemParts.length) {
        // Truncate the parts array so _value reflects the current state
        itemParts.length = partIndex;
        this.clear(itemPart && itemPart.endNode);
      }
    }
    clear(startNode = this.startNode) {
      removeNodes(
        this.startNode.parentNode,
        startNode.nextSibling,
        this.endNode
      );
    }
  }
  /**
   * Implements a boolean attribute, roughly as defined in the HTML
   * specification.
   *
   * If the value is truthy, then the attribute is present with a value of
   * ''. If the value is falsey, the attribute is removed.
   */
  class BooleanAttributePart {
    constructor(element, name, strings) {
      this.value = undefined;
      this.__pendingValue = undefined;
      if (strings.length !== 2 || strings[0] !== "" || strings[1] !== "") {
        throw new Error(
          "Boolean attributes can only contain a single expression"
        );
      }
      this.element = element;
      this.name = name;
      this.strings = strings;
    }
    setValue(value) {
      this.__pendingValue = value;
    }
    commit() {
      while (isDirective(this.__pendingValue)) {
        const directive$$1 = this.__pendingValue;
        this.__pendingValue = noChange;
        directive$$1(this);
      }
      if (this.__pendingValue === noChange) {
        return;
      }
      const value = !!this.__pendingValue;
      if (this.value !== value) {
        if (value) {
          this.element.setAttribute(this.name, "");
        } else {
          this.element.removeAttribute(this.name);
        }
        this.value = value;
      }
      this.__pendingValue = noChange;
    }
  }
  /**
   * Sets attribute values for PropertyParts, so that the value is only set once
   * even if there are multiple parts for a property.
   *
   * If an expression controls the whole property value, then the value is simply
   * assigned to the property under control. If there are string literals or
   * multiple expressions, then the strings are expressions are interpolated into
   * a string first.
   */
  class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
      super(element, name, strings);
      this.single =
        strings.length === 2 && strings[0] === "" && strings[1] === "";
    }
    _createPart() {
      return new PropertyPart(this);
    }
    _getValue() {
      if (this.single) {
        return this.parts[0].value;
      }
      return super._getValue();
    }
    commit() {
      if (this.dirty) {
        this.dirty = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.element[this.name] = this._getValue();
      }
    }
  }
  class PropertyPart extends AttributePart {}
  // Detect event listener options support. If the `capture` property is read
  // from the options object, then options are supported. If not, then the third
  // argument to add/removeEventListener is interpreted as the boolean capture
  // value so we should only pass the `capture` property.
  let eventOptionsSupported = false;
  // Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
  // blocks right into the body of a module
  (() => {
    try {
      const options = {
        get capture() {
          eventOptionsSupported = true;
          return false;
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.addEventListener("test", options, options);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.removeEventListener("test", options, options);
    } catch (_e) {
      // event options not supported
    }
  })();
  class EventPart {
    constructor(element, eventName, eventContext) {
      this.value = undefined;
      this.__pendingValue = undefined;
      this.element = element;
      this.eventName = eventName;
      this.eventContext = eventContext;
      this.__boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
      this.__pendingValue = value;
    }
    commit() {
      while (isDirective(this.__pendingValue)) {
        const directive$$1 = this.__pendingValue;
        this.__pendingValue = noChange;
        directive$$1(this);
      }
      if (this.__pendingValue === noChange) {
        return;
      }
      const newListener = this.__pendingValue;
      const oldListener = this.value;
      const shouldRemoveListener =
        newListener == null ||
        (oldListener != null &&
          (newListener.capture !== oldListener.capture ||
            newListener.once !== oldListener.once ||
            newListener.passive !== oldListener.passive));
      const shouldAddListener =
        newListener != null && (oldListener == null || shouldRemoveListener);
      if (shouldRemoveListener) {
        this.element.removeEventListener(
          this.eventName,
          this.__boundHandleEvent,
          this.__options
        );
      }
      if (shouldAddListener) {
        this.__options = getOptions(newListener);
        this.element.addEventListener(
          this.eventName,
          this.__boundHandleEvent,
          this.__options
        );
      }
      this.value = newListener;
      this.__pendingValue = noChange;
    }
    handleEvent(event) {
      if (typeof this.value === "function") {
        this.value.call(this.eventContext || this.element, event);
      } else {
        this.value.handleEvent(event);
      }
    }
  }
  // We copy options because of the inconsistent behavior of browsers when reading
  // the third argument of add/removeEventListener. IE11 doesn't support options
  // at all. Chrome 41 only reads `capture` if the argument is an object.
  const getOptions = (o) =>
    o &&
    (eventOptionsSupported
      ? { capture: o.capture, passive: o.passive, once: o.once }
      : o.capture);
  //# sourceMappingURL=parts.js.map

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * The default TemplateFactory which caches Templates keyed on
   * result.type and result.strings.
   */
  function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
      templateCache = {
        stringsArray: new WeakMap(),
        keyString: new Map(),
      };
      templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
      return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(marker);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
      // If we have not seen this key before, create a new Template
      template = new Template(result, result.getTemplateElement());
      // Cache the Template for this key
      templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
  }
  const templateCaches = new Map();
  //# sourceMappingURL=template-factory.js.map

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const parts = new WeakMap();
  /**
   * Renders a template result or other value to a container.
   *
   * To update a container with new values, reevaluate the template literal and
   * call `render` with the new result.
   *
   * @param result Any value renderable by NodePart - typically a TemplateResult
   *     created by evaluating a template tag like `html` or `svg`.
   * @param container A DOM parent to render to. The entire contents are either
   *     replaced, or efficiently updated if the same result type was previous
   *     rendered there.
   * @param options RenderOptions for the entire render tree rendered to this
   *     container. Render options must *not* change between renders to the same
   *     container, as those changes will not effect previously rendered DOM.
   */
  const render = (result, container, options) => {
    let part = parts.get(container);
    if (part === undefined) {
      removeNodes(container, container.firstChild);
      parts.set(
        container,
        (part = new NodePart(Object.assign({ templateFactory }, options)))
      );
      part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
  };
  //# sourceMappingURL=render.js.map

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * Creates Parts when a template is instantiated.
   */
  class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
      const prefix = name[0];
      if (prefix === ".") {
        const committer = new PropertyCommitter(
          element,
          name.slice(1),
          strings
        );
        return committer.parts;
      }
      if (prefix === "@") {
        return [new EventPart(element, name.slice(1), options.eventContext)];
      }
      if (prefix === "?") {
        return [new BooleanAttributePart(element, name.slice(1), strings)];
      }
      const committer = new AttributeCommitter(element, name, strings);
      return committer.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
      return new NodePart(options);
    }
  }
  const defaultTemplateProcessor = new DefaultTemplateProcessor();
  //# sourceMappingURL=default-template-processor.js.map

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  // IMPORTANT: do not change the property name or the assignment expression.
  // This line will be used in regexes to search for lit-html usage.
  // TODO(justinfagnani): inject version number at build time
  if (typeof window !== "undefined") {
    (window["litHtmlVersions"] || (window["litHtmlVersions"] = [])).push(
      "1.2.1"
    );
  }
  /**
   * Interprets a template literal as an HTML template that can efficiently
   * render to and update a container.
   */
  const html = (strings, ...values) =>
    new TemplateResult(strings, values, "html", defaultTemplateProcessor);
  //# sourceMappingURL=lit-html.js.map

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  // Get a key to lookup in `templateCaches`.
  const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
  let compatibleShadyCSSVersion = true;
  if (typeof window.ShadyCSS === "undefined") {
    compatibleShadyCSSVersion = false;
  } else if (typeof window.ShadyCSS.prepareTemplateDom === "undefined") {
    console.warn(
      `Incompatible ShadyCSS version detected. ` +
        `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` +
        `@webcomponents/shadycss@1.3.1.`
    );
    compatibleShadyCSSVersion = false;
  }
  /**
   * Template factory which scopes template DOM using ShadyCSS.
   * @param scopeName {string}
   */
  const shadyTemplateFactory = (scopeName) => (result) => {
    const cacheKey = getTemplateCacheKey(result.type, scopeName);
    let templateCache = templateCaches.get(cacheKey);
    if (templateCache === undefined) {
      templateCache = {
        stringsArray: new WeakMap(),
        keyString: new Map(),
      };
      templateCaches.set(cacheKey, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
      return template;
    }
    const key = result.strings.join(marker);
    template = templateCache.keyString.get(key);
    if (template === undefined) {
      const element = result.getTemplateElement();
      if (compatibleShadyCSSVersion) {
        window.ShadyCSS.prepareTemplateDom(element, scopeName);
      }
      template = new Template(result, element);
      templateCache.keyString.set(key, template);
    }
    templateCache.stringsArray.set(result.strings, template);
    return template;
  };
  const TEMPLATE_TYPES = ["html", "svg"];
  /**
   * Removes all style elements from Templates for the given scopeName.
   */
  const removeStylesFromLitTemplates = (scopeName) => {
    TEMPLATE_TYPES.forEach((type) => {
      const templates = templateCaches.get(
        getTemplateCacheKey(type, scopeName)
      );
      if (templates !== undefined) {
        templates.keyString.forEach((template) => {
          const {
            element: { content },
          } = template;
          // IE 11 doesn't support the iterable param Set constructor
          const styles = new Set();
          Array.from(content.querySelectorAll("style")).forEach((s) => {
            styles.add(s);
          });
          removeNodesFromTemplate(template, styles);
        });
      }
    });
  };
  const shadyRenderSet = new Set();
  /**
   * For the given scope name, ensures that ShadyCSS style scoping is performed.
   * This is done just once per scope name so the fragment and template cannot
   * be modified.
   * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
   * to be scoped and appended to the document
   * (2) removes style elements from all lit-html Templates for this scope name.
   *
   * Note, <style> elements can only be placed into templates for the
   * initial rendering of the scope. If <style> elements are included in templates
   * dynamically rendered to the scope (after the first scope render), they will
   * not be scoped and the <style> will be left in the template and rendered
   * output.
   */
  const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
    shadyRenderSet.add(scopeName);
    // If `renderedDOM` is stamped from a Template, then we need to edit that
    // Template's underlying template element. Otherwise, we create one here
    // to give to ShadyCSS, which still requires one while scoping.
    const templateElement = !!template
      ? template.element
      : document.createElement("template");
    // Move styles out of rendered DOM and store.
    const styles = renderedDOM.querySelectorAll("style");
    const { length } = styles;
    // If there are no styles, skip unnecessary work
    if (length === 0) {
      // Ensure prepareTemplateStyles is called to support adding
      // styles via `prepareAdoptedCssText` since that requires that
      // `prepareTemplateStyles` is called.
      //
      // ShadyCSS will only update styles containing @apply in the template
      // given to `prepareTemplateStyles`. If no lit Template was given,
      // ShadyCSS will not be able to update uses of @apply in any relevant
      // template. However, this is not a problem because we only create the
      // template for the purpose of supporting `prepareAdoptedCssText`,
      // which doesn't support @apply at all.
      window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
      return;
    }
    const condensedStyle = document.createElement("style");
    // Collect styles into a single style. This helps us make sure ShadyCSS
    // manipulations will not prevent us from being able to fix up template
    // part indices.
    // NOTE: collecting styles is inefficient for browsers but ShadyCSS
    // currently does this anyway. When it does not, this should be changed.
    for (let i = 0; i < length; i++) {
      const style = styles[i];
      style.parentNode.removeChild(style);
      condensedStyle.textContent += style.textContent;
    }
    // Remove styles from nested templates in this scope.
    removeStylesFromLitTemplates(scopeName);
    // And then put the condensed style into the "root" template passed in as
    // `template`.
    const content = templateElement.content;
    if (!!template) {
      insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
    } else {
      content.insertBefore(condensedStyle, content.firstChild);
    }
    // Note, it's important that ShadyCSS gets the template that `lit-html`
    // will actually render so that it can update the style inside when
    // needed (e.g. @apply native Shadow DOM case).
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    const style = content.querySelector("style");
    if (window.ShadyCSS.nativeShadow && style !== null) {
      // When in native Shadow DOM, ensure the style created by ShadyCSS is
      // included in initially rendered output (`renderedDOM`).
      renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
    } else if (!!template) {
      // When no style is left in the template, parts will be broken as a
      // result. To fix this, we put back the style node ShadyCSS removed
      // and then tell lit to remove that node from the template.
      // There can be no style in the template in 2 cases (1) when Shady DOM
      // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
      // is in use ShadyCSS removes the style if it contains no content.
      // NOTE, ShadyCSS creates its own style so we can safely add/remove
      // `condensedStyle` here.
      content.insertBefore(condensedStyle, content.firstChild);
      const removes = new Set();
      removes.add(condensedStyle);
      removeNodesFromTemplate(template, removes);
    }
  };
  /**
   * Extension to the standard `render` method which supports rendering
   * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
   * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
   * or when the webcomponentsjs
   * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
   *
   * Adds a `scopeName` option which is used to scope element DOM and stylesheets
   * when native ShadowDOM is unavailable. The `scopeName` will be added to
   * the class attribute of all rendered DOM. In addition, any style elements will
   * be automatically re-written with this `scopeName` selector and moved out
   * of the rendered DOM and into the document `<head>`.
   *
   * It is common to use this render method in conjunction with a custom element
   * which renders a shadowRoot. When this is done, typically the element's
   * `localName` should be used as the `scopeName`.
   *
   * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
   * custom properties (needed only on older browsers like IE11) and a shim for
   * a deprecated feature called `@apply` that supports applying a set of css
   * custom properties to a given location.
   *
   * Usage considerations:
   *
   * * Part values in `<style>` elements are only applied the first time a given
   * `scopeName` renders. Subsequent changes to parts in style elements will have
   * no effect. Because of this, parts in style elements should only be used for
   * values that will never change, for example parts that set scope-wide theme
   * values or parts which render shared style elements.
   *
   * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
   * custom element's `constructor` is not supported. Instead rendering should
   * either done asynchronously, for example at microtask timing (for example
   * `Promise.resolve()`), or be deferred until the first time the element's
   * `connectedCallback` runs.
   *
   * Usage considerations when using shimmed custom properties or `@apply`:
   *
   * * Whenever any dynamic changes are made which affect
   * css custom properties, `ShadyCSS.styleElement(element)` must be called
   * to update the element. There are two cases when this is needed:
   * (1) the element is connected to a new parent, (2) a class is added to the
   * element that causes it to match different custom properties.
   * To address the first case when rendering a custom element, `styleElement`
   * should be called in the element's `connectedCallback`.
   *
   * * Shimmed custom properties may only be defined either for an entire
   * shadowRoot (for example, in a `:host` rule) or via a rule that directly
   * matches an element with a shadowRoot. In other words, instead of flowing from
   * parent to child as do native css custom properties, shimmed custom properties
   * flow only from shadowRoots to nested shadowRoots.
   *
   * * When using `@apply` mixing css shorthand property names with
   * non-shorthand names (for example `border` and `border-width`) is not
   * supported.
   */
  const render$1 = (result, container, options) => {
    if (!options || typeof options !== "object" || !options.scopeName) {
      throw new Error("The `scopeName` option is required.");
    }
    const scopeName = options.scopeName;
    const hasRendered = parts.has(container);
    const needsScoping =
      compatibleShadyCSSVersion &&
      container.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */ &&
      !!container.host;
    // Handle first render to a scope specially...
    const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
    // On first scope render, render into a fragment; this cannot be a single
    // fragment that is reused since nested renders can occur synchronously.
    const renderContainer = firstScopeRender
      ? document.createDocumentFragment()
      : container;
    render(
      result,
      renderContainer,
      Object.assign(
        { templateFactory: shadyTemplateFactory(scopeName) },
        options
      )
    );
    // When performing first scope render,
    // (1) We've rendered into a fragment so that there's a chance to
    // `prepareTemplateStyles` before sub-elements hit the DOM
    // (which might cause them to render based on a common pattern of
    // rendering in a custom element's `connectedCallback`);
    // (2) Scope the template with ShadyCSS one time only for this scope.
    // (3) Render the fragment into the container and make sure the
    // container knows its `part` is the one we just rendered. This ensures
    // DOM will be re-used on subsequent renders.
    if (firstScopeRender) {
      const part = parts.get(renderContainer);
      parts.delete(renderContainer);
      // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
      // that should apply to `renderContainer` even if the rendered value is
      // not a TemplateInstance. However, it will only insert scoped styles
      // into the document if `prepareTemplateStyles` has already been called
      // for the given scope name.
      const template =
        part.value instanceof TemplateInstance
          ? part.value.template
          : undefined;
      prepareTemplateStyles(scopeName, renderContainer, template);
      removeNodes(container, container.firstChild);
      container.appendChild(renderContainer);
      parts.set(container, part);
    }
    // After elements have hit the DOM, update styling if this is the
    // initial render to this container.
    // This is needed whenever dynamic changes are made so it would be
    // safest to do every render; however, this would regress performance
    // so we leave it up to the user to call `ShadyCSS.styleElement`
    // for dynamic changes.
    if (!hasRendered && needsScoping) {
      window.ShadyCSS.styleElement(container.host);
    }
  };
  //# sourceMappingURL=shady-render.js.map

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var _a;
  /**
   * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
   * replaced at compile time by the munged name for object[property]. We cannot
   * alias this function, so we have to use a small shim that has the same
   * behavior when not compiling.
   */
  window.JSCompiler_renameProperty = (prop, _obj) => prop;
  const defaultConverter = {
    toAttribute(value, type) {
      switch (type) {
        case Boolean:
          return value ? "" : null;
        case Object:
        case Array:
          // if the value is `null` or `undefined` pass this through
          // to allow removing/no change behavior.
          return value == null ? value : JSON.stringify(value);
      }
      return value;
    },
    fromAttribute(value, type) {
      switch (type) {
        case Boolean:
          return value !== null;
        case Number:
          return value === null ? null : Number(value);
        case Object:
        case Array:
          return JSON.parse(value);
      }
      return value;
    },
  };
  /**
   * Change function that returns true if `value` is different from `oldValue`.
   * This method is used as the default for a property's `hasChanged` function.
   */
  const notEqual = (value, old) => {
    // This ensures (old==NaN, value==NaN) always returns false
    return old !== value && (old === old || value === value);
  };
  const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual,
  };
  const STATE_HAS_UPDATED = 1;
  const STATE_UPDATE_REQUESTED = 1 << 2;
  const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
  const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
  /**
   * The Closure JS Compiler doesn't currently have good support for static
   * property semantics where "this" is dynamic (e.g.
   * https://github.com/google/closure-compiler/issues/3177 and others) so we use
   * this hack to bypass any rewriting by the compiler.
   */
  const finalized = "finalized";
  /**
   * Base element class which manages element properties and attributes. When
   * properties change, the `update` method is asynchronously called. This method
   * should be supplied by subclassers to render updates as desired.
   */
  class UpdatingElement extends HTMLElement {
    constructor() {
      super();
      this._updateState = 0;
      this._instanceProperties = undefined;
      // Initialize to an unresolved Promise so we can make sure the element has
      // connected before first update.
      this._updatePromise = new Promise(
        (res) => (this._enableUpdatingResolver = res)
      );
      /**
       * Map with keys for any properties that have changed since the last
       * update cycle with previous values.
       */
      this._changedProperties = new Map();
      /**
       * Map with keys of properties that should be reflected when updated.
       */
      this._reflectingProperties = undefined;
      this.initialize();
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */
    static get observedAttributes() {
      // note: piggy backing on this to ensure we're finalized.
      this.finalize();
      const attributes = [];
      // Use forEach so this works even if for/of loops are compiled to for loops
      // expecting arrays
      this._classProperties.forEach((v, p) => {
        const attr = this._attributeNameForProperty(p, v);
        if (attr !== undefined) {
          this._attributeToPropertyMap.set(attr, p);
          attributes.push(attr);
        }
      });
      return attributes;
    }
    /**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */
    /** @nocollapse */
    static _ensureClassProperties() {
      // ensure private storage for property declarations.
      if (
        !this.hasOwnProperty(
          JSCompiler_renameProperty("_classProperties", this)
        )
      ) {
        this._classProperties = new Map();
        // NOTE: Workaround IE11 not supporting Map constructor argument.
        const superProperties = Object.getPrototypeOf(this)._classProperties;
        if (superProperties !== undefined) {
          superProperties.forEach((v, k) => this._classProperties.set(k, v));
        }
      }
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist
     * and stores a PropertyDeclaration for the property with the given options.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     *
     * This method may be overridden to customize properties; however,
     * when doing so, it's important to call `super.createProperty` to ensure
     * the property is setup correctly. This method calls
     * `getPropertyDescriptor` internally to get a descriptor to install.
     * To customize what properties do when they are get or set, override
     * `getPropertyDescriptor`. To customize the options for a property,
     * implement `createProperty` like this:
     *
     * static createProperty(name, options) {
     *   options = Object.assign(options, {myOption: true});
     *   super.createProperty(name, options);
     * }
     *
     * @nocollapse
     */
    static createProperty(name, options = defaultPropertyDeclaration) {
      // Note, since this can be called by the `@property` decorator which
      // is called before `finalize`, we ensure storage exists for property
      // metadata.
      this._ensureClassProperties();
      this._classProperties.set(name, options);
      // Do not generate an accessor if the prototype already has one, since
      // it would be lost otherwise and that would never be the user's intention;
      // Instead, we expect users to call `requestUpdate` themselves from
      // user-defined accessors. Note that if the super has an accessor we will
      // still overwrite it
      if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
        return;
      }
      const key = typeof name === "symbol" ? Symbol() : `__${name}`;
      const descriptor = this.getPropertyDescriptor(name, key, options);
      if (descriptor !== undefined) {
        Object.defineProperty(this.prototype, name, descriptor);
      }
    }
    /**
     * Returns a property descriptor to be defined on the given named property.
     * If no descriptor is returned, the property will not become an accessor.
     * For example,
     *
     *   class MyElement extends LitElement {
     *     static getPropertyDescriptor(name, key, options) {
     *       const defaultDescriptor =
     *           super.getPropertyDescriptor(name, key, options);
     *       const setter = defaultDescriptor.set;
     *       return {
     *         get: defaultDescriptor.get,
     *         set(value) {
     *           setter.call(this, value);
     *           // custom action.
     *         },
     *         configurable: true,
     *         enumerable: true
     *       }
     *     }
     *   }
     *
     * @nocollapse
     */
    static getPropertyDescriptor(name, key, _options) {
      return {
        // tslint:disable-next-line:no-any no symbol in index
        get() {
          return this[key];
        },
        set(value) {
          const oldValue = this[name];
          this[key] = value;
          this._requestUpdate(name, oldValue);
        },
        configurable: true,
        enumerable: true,
      };
    }
    /**
     * Returns the property options associated with the given property.
     * These options are defined with a PropertyDeclaration via the `properties`
     * object or the `@property` decorator and are registered in
     * `createProperty(...)`.
     *
     * Note, this method should be considered "final" and not overridden. To
     * customize the options for a given property, override `createProperty`.
     *
     * @nocollapse
     * @final
     */
    static getPropertyOptions(name) {
      return (
        (this._classProperties && this._classProperties.get(name)) ||
        defaultPropertyDeclaration
      );
    }
    /**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */
    static finalize() {
      // finalize any superclasses
      const superCtor = Object.getPrototypeOf(this);
      if (!superCtor.hasOwnProperty(finalized)) {
        superCtor.finalize();
      }
      this[finalized] = true;
      this._ensureClassProperties();
      // initialize Map populated in observedAttributes
      this._attributeToPropertyMap = new Map();
      // make any properties
      // Note, only process "own" properties since this element will inherit
      // any properties defined on the superClass, and finalization ensures
      // the entire prototype chain is finalized.
      if (this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
        const props = this.properties;
        // support symbols in properties (IE11 does not support this)
        const propKeys = [
          ...Object.getOwnPropertyNames(props),
          ...(typeof Object.getOwnPropertySymbols === "function"
            ? Object.getOwnPropertySymbols(props)
            : []),
        ];
        // This for/of is ok because propKeys is an array
        for (const p of propKeys) {
          // note, use of `any` is due to TypeSript lack of support for symbol in
          // index types
          // tslint:disable-next-line:no-any no symbol in index
          this.createProperty(p, props[p]);
        }
      }
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */
    static _attributeNameForProperty(name, options) {
      const attribute = options.attribute;
      return attribute === false
        ? undefined
        : typeof attribute === "string"
        ? attribute
        : typeof name === "string"
        ? name.toLowerCase()
        : undefined;
    }
    /**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */
    static _valueHasChanged(value, old, hasChanged = notEqual) {
      return hasChanged(value, old);
    }
    /**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */
    static _propertyValueFromAttribute(value, options) {
      const type = options.type;
      const converter = options.converter || defaultConverter;
      const fromAttribute =
        typeof converter === "function" ? converter : converter.fromAttribute;
      return fromAttribute ? fromAttribute(value, type) : value;
    }
    /**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     * @nocollapse
     */
    static _propertyValueToAttribute(value, options) {
      if (options.reflect === undefined) {
        return;
      }
      const type = options.type;
      const converter = options.converter;
      const toAttribute =
        (converter && converter.toAttribute) || defaultConverter.toAttribute;
      return toAttribute(value, type);
    }
    /**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */
    initialize() {
      this._saveInstanceProperties();
      // ensures first update will be caught by an early access of
      // `updateComplete`
      this._requestUpdate();
    }
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */
    _saveInstanceProperties() {
      // Use forEach so this works even if for/of loops are compiled to for loops
      // expecting arrays
      this.constructor._classProperties.forEach((_v, p) => {
        if (this.hasOwnProperty(p)) {
          const value = this[p];
          delete this[p];
          if (!this._instanceProperties) {
            this._instanceProperties = new Map();
          }
          this._instanceProperties.set(p, value);
        }
      });
    }
    /**
     * Applies previously saved instance properties.
     */
    _applyInstanceProperties() {
      // Use forEach so this works even if for/of loops are compiled to for loops
      // expecting arrays
      // tslint:disable-next-line:no-any
      this._instanceProperties.forEach((v, p) => (this[p] = v));
      this._instanceProperties = undefined;
    }
    connectedCallback() {
      // Ensure first connection completes an update. Updates cannot complete
      // before connection.
      this.enableUpdating();
    }
    enableUpdating() {
      if (this._enableUpdatingResolver !== undefined) {
        this._enableUpdatingResolver();
        this._enableUpdatingResolver = undefined;
      }
    }
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */
    disconnectedCallback() {}
    /**
     * Synchronizes property values when attributes change.
     */
    attributeChangedCallback(name, old, value) {
      if (old !== value) {
        this._attributeToProperty(name, value);
      }
    }
    _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
      const ctor = this.constructor;
      const attr = ctor._attributeNameForProperty(name, options);
      if (attr !== undefined) {
        const attrValue = ctor._propertyValueToAttribute(value, options);
        // an undefined value does not change the attribute.
        if (attrValue === undefined) {
          return;
        }
        // Track if the property is being reflected to avoid
        // setting the property again via `attributeChangedCallback`. Note:
        // 1. this takes advantage of the fact that the callback is synchronous.
        // 2. will behave incorrectly if multiple attributes are in the reaction
        // stack at time of calling. However, since we process attributes
        // in `update` this should not be possible (or an extreme corner case
        // that we'd like to discover).
        // mark state reflecting
        this._updateState =
          this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
        if (attrValue == null) {
          this.removeAttribute(attr);
        } else {
          this.setAttribute(attr, attrValue);
        }
        // mark state not reflecting
        this._updateState =
          this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
      }
    }
    _attributeToProperty(name, value) {
      // Use tracking info to avoid deserializing attribute value if it was
      // just set from a property setter.
      if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
        return;
      }
      const ctor = this.constructor;
      // Note, hint this as an `AttributeMap` so closure clearly understands
      // the type; it has issues with tracking types through statics
      // tslint:disable-next-line:no-unnecessary-type-assertion
      const propName = ctor._attributeToPropertyMap.get(name);
      if (propName !== undefined) {
        const options = ctor.getPropertyOptions(propName);
        // mark state reflecting
        this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
        this[propName] =
          // tslint:disable-next-line:no-any
          ctor._propertyValueFromAttribute(value, options);
        // mark state not reflecting
        this._updateState =
          this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
      }
    }
    /**
     * This private version of `requestUpdate` does not access or return the
     * `updateComplete` promise. This promise can be overridden and is therefore
     * not free to access.
     */
    _requestUpdate(name, oldValue) {
      let shouldRequestUpdate = true;
      // If we have a property key, perform property update steps.
      if (name !== undefined) {
        const ctor = this.constructor;
        const options = ctor.getPropertyOptions(name);
        if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
          if (!this._changedProperties.has(name)) {
            this._changedProperties.set(name, oldValue);
          }
          // Add to reflecting properties set.
          // Note, it's important that every change has a chance to add the
          // property to `_reflectingProperties`. This ensures setting
          // attribute + property reflects correctly.
          if (
            options.reflect === true &&
            !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)
          ) {
            if (this._reflectingProperties === undefined) {
              this._reflectingProperties = new Map();
            }
            this._reflectingProperties.set(name, options);
          }
        } else {
          // Abort the request if the property should not be considered changed.
          shouldRequestUpdate = false;
        }
      }
      if (!this._hasRequestedUpdate && shouldRequestUpdate) {
        this._updatePromise = this._enqueueUpdate();
      }
    }
    /**
     * Requests an update which is processed asynchronously. This should
     * be called when an element should update based on some state not triggered
     * by setting a property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored. Returns the `updateComplete` Promise which is resolved
     * when the update completes.
     *
     * @param name {PropertyKey} (optional) name of requesting property
     * @param oldValue {any} (optional) old value of requesting property
     * @returns {Promise} A Promise that is resolved when the update completes.
     */
    requestUpdate(name, oldValue) {
      this._requestUpdate(name, oldValue);
      return this.updateComplete;
    }
    /**
     * Sets up the element to asynchronously update.
     */
    async _enqueueUpdate() {
      this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
      try {
        // Ensure any previous update has resolved before updating.
        // This `await` also ensures that property changes are batched.
        await this._updatePromise;
      } catch (e) {
        // Ignore any previous errors. We only care that the previous cycle is
        // done. Any error should have been handled in the previous update.
      }
      const result = this.performUpdate();
      // If `performUpdate` returns a Promise, we await it. This is done to
      // enable coordinating updates with a scheduler. Note, the result is
      // checked to avoid delaying an additional microtask unless we need to.
      if (result != null) {
        await result;
      }
      return !this._hasRequestedUpdate;
    }
    get _hasRequestedUpdate() {
      return this._updateState & STATE_UPDATE_REQUESTED;
    }
    get hasUpdated() {
      return this._updateState & STATE_HAS_UPDATED;
    }
    /**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * You can override this method to change the timing of updates. If this
     * method is overridden, `super.performUpdate()` must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```
     * protected async performUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.performUpdate();
     * }
     * ```
     */
    performUpdate() {
      // Mixin instance properties once, if they exist.
      if (this._instanceProperties) {
        this._applyInstanceProperties();
      }
      let shouldUpdate = false;
      const changedProperties = this._changedProperties;
      try {
        shouldUpdate = this.shouldUpdate(changedProperties);
        if (shouldUpdate) {
          this.update(changedProperties);
        } else {
          this._markUpdated();
        }
      } catch (e) {
        // Prevent `firstUpdated` and `updated` from running when there's an
        // update exception.
        shouldUpdate = false;
        // Ensure element can accept additional updates after an exception.
        this._markUpdated();
        throw e;
      }
      if (shouldUpdate) {
        if (!(this._updateState & STATE_HAS_UPDATED)) {
          this._updateState = this._updateState | STATE_HAS_UPDATED;
          this.firstUpdated(changedProperties);
        }
        this.updated(changedProperties);
      }
    }
    _markUpdated() {
      this._changedProperties = new Map();
      this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `_getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super._getUpdateComplete()`, then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */
    get updateComplete() {
      return this._getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async _getUpdateComplete() {
     *       await super._getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     */
    _getUpdateComplete() {
      return this._updatePromise;
    }
    /**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    shouldUpdate(_changedProperties) {
      return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    update(_changedProperties) {
      if (
        this._reflectingProperties !== undefined &&
        this._reflectingProperties.size > 0
      ) {
        // Use forEach so this works even if for/of loops are compiled to for
        // loops expecting arrays
        this._reflectingProperties.forEach((v, k) =>
          this._propertyToAttribute(k, this[k], v)
        );
        this._reflectingProperties = undefined;
      }
      this._markUpdated();
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    updated(_changedProperties) {}
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    firstUpdated(_changedProperties) {}
  }
  _a = finalized;
  /**
   * Marks class as having finished creating properties.
   */
  UpdatingElement[_a] = true;
  //# sourceMappingURL=updating-element.js.map

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  //# sourceMappingURL=decorators.js.map

  /**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */
  const supportsAdoptingStyleSheets =
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype;
  const constructionToken = Symbol();
  class CSSResult {
    constructor(cssText, safeToken) {
      if (safeToken !== constructionToken) {
        throw new Error(
          "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
        );
      }
      this.cssText = cssText;
    }
    // Note, this is a getter so that it's lazy. In practice, this means
    // stylesheets are not created until the first element instance is made.
    get styleSheet() {
      if (this._styleSheet === undefined) {
        // Note, if `adoptedStyleSheets` is supported then we assume CSSStyleSheet
        // is constructable.
        if (supportsAdoptingStyleSheets) {
          this._styleSheet = new CSSStyleSheet();
          this._styleSheet.replaceSync(this.cssText);
        } else {
          this._styleSheet = null;
        }
      }
      return this._styleSheet;
    }
    toString() {
      return this.cssText;
    }
  }
  const textFromCSSResult = (value) => {
    if (value instanceof CSSResult) {
      return value.cssText;
    } else if (typeof value === "number") {
      return value;
    } else {
      throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
    }
  };
  /**
   * Template tag which which can be used with LitElement's `style` property to
   * set element styles. For security reasons, only literal string values may be
   * used. To incorporate non-literal values `unsafeCSS` may be used inside a
   * template string part.
   */
  const css = (strings, ...values) => {
    const cssText = values.reduce(
      (acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1],
      strings[0]
    );
    return new CSSResult(cssText, constructionToken);
  };
  //# sourceMappingURL=css-tag.js.map

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  // IMPORTANT: do not change the property name or the assignment expression.
  // This line will be used in regexes to search for LitElement usage.
  // TODO(justinfagnani): inject version number at build time
  (window["litElementVersions"] || (window["litElementVersions"] = [])).push(
    "2.3.1"
  );
  /**
   * Sentinal value used to avoid calling lit-html's render function when
   * subclasses do not implement `render`
   */
  const renderNotImplemented = {};
  class LitElement extends UpdatingElement {
    /**
     * Return the array of styles to apply to the element.
     * Override this method to integrate into a style management system.
     *
     * @nocollapse
     */
    static getStyles() {
      return this.styles;
    }
    /** @nocollapse */
    static _getUniqueStyles() {
      // Only gather styles once per class
      if (this.hasOwnProperty(JSCompiler_renameProperty("_styles", this))) {
        return;
      }
      // Take care not to call `this.getStyles()` multiple times since this
      // generates new CSSResults each time.
      // TODO(sorvell): Since we do not cache CSSResults by input, any
      // shared styles will generate new stylesheet objects, which is wasteful.
      // This should be addressed when a browser ships constructable
      // stylesheets.
      const userStyles = this.getStyles();
      if (userStyles === undefined) {
        this._styles = [];
      } else if (Array.isArray(userStyles)) {
        // De-duplicate styles preserving the _last_ instance in the set.
        // This is a performance optimization to avoid duplicated styles that can
        // occur especially when composing via subclassing.
        // The last item is kept to try to preserve the cascade order with the
        // assumption that it's most important that last added styles override
        // previous styles.
        const addStyles = (styles, set) =>
          styles.reduceRight(
            (set, s) =>
              // Note: On IE set.add() does not return the set
              Array.isArray(s) ? addStyles(s, set) : (set.add(s), set),
            set
          );
        // Array.from does not work on Set in IE, otherwise return
        // Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()
        const set = addStyles(userStyles, new Set());
        const styles = [];
        set.forEach((v) => styles.unshift(v));
        this._styles = styles;
      } else {
        this._styles = [userStyles];
      }
    }
    /**
     * Performs element initialization. By default this calls `createRenderRoot`
     * to create the element `renderRoot` node and captures any pre-set values for
     * registered properties.
     */
    initialize() {
      super.initialize();
      this.constructor._getUniqueStyles();
      this.renderRoot = this.createRenderRoot();
      // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
      // element's getRootNode(). While this could be done, we're choosing not to
      // support this now since it would require different logic around de-duping.
      if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
        this.adoptStyles();
      }
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */
    createRenderRoot() {
      return this.attachShadow({ mode: "open" });
    }
    /**
     * Applies styling to the element shadowRoot using the `static get styles`
     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
     * available and will fallback otherwise. When Shadow DOM is polyfilled,
     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the
     * end of the `shadowRoot` to [mimic spec
     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */
    adoptStyles() {
      const styles = this.constructor._styles;
      if (styles.length === 0) {
        return;
      }
      // There are three separate cases here based on Shadow DOM support.
      // (1) shadowRoot polyfilled: use ShadyCSS
      // (2) shadowRoot.adoptedStyleSheets available: use it.
      // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
      // rendering
      if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
        window.ShadyCSS.ScopingShim.prepareAdoptedCssText(
          styles.map((s) => s.cssText),
          this.localName
        );
      } else if (supportsAdoptingStyleSheets) {
        this.renderRoot.adoptedStyleSheets = styles.map((s) => s.styleSheet);
      } else {
        // This must be done after rendering so the actual style insertion is done
        // in `update`.
        this._needsShimAdoptedStyleSheets = true;
      }
    }
    connectedCallback() {
      super.connectedCallback();
      // Note, first update/render handles styleElement so we only call this if
      // connected after first update.
      if (this.hasUpdated && window.ShadyCSS !== undefined) {
        window.ShadyCSS.styleElement(this);
      }
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * @param _changedProperties Map of changed properties with old values
     */
    update(changedProperties) {
      // Setting properties in `render` should not trigger an update. Since
      // updates are allowed after super.update, it's important to call `render`
      // before that.
      const templateResult = this.render();
      super.update(changedProperties);
      // If render is not implemented by the component, don't call lit-html render
      if (templateResult !== renderNotImplemented) {
        this.constructor.render(templateResult, this.renderRoot, {
          scopeName: this.localName,
          eventContext: this,
        });
      }
      // When native Shadow DOM is used but adoptedStyles are not supported,
      // insert styling after rendering to ensure adoptedStyles have highest
      // priority.
      if (this._needsShimAdoptedStyleSheets) {
        this._needsShimAdoptedStyleSheets = false;
        this.constructor._styles.forEach((s) => {
          const style = document.createElement("style");
          style.textContent = s.cssText;
          this.renderRoot.appendChild(style);
        });
      }
    }
    /**
     * Invoked on each update to perform rendering tasks. This method may return
     * any value renderable by lit-html's NodePart - typically a TemplateResult.
     * Setting properties inside this method will *not* trigger the element to
     * update.
     */
    render() {
      return renderNotImplemented;
    }
  }
  /**
   * Ensure this class is marked as `finalized` as an optimization ensuring
   * it will not needlessly try to `finalize`.
   *
   * Note this property name is a string to prevent breaking Closure JS Compiler
   * optimizations. See updating-element.ts for more information.
   */
  LitElement["finalized"] = true;
  /**
   * Render method used to render the value to the element's DOM.
   * @param result The value to render.
   * @param container Node into which to render.
   * @param options Element name.
   * @nocollapse
   */
  LitElement.render = render$1;
  //# sourceMappingURL=lit-element.js.map

  /**
   * @license
   * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  // IE11 doesn't support classList on SVG elements, so we emulate it with a Set
  class ClassList {
    constructor(element) {
      this.classes = new Set();
      this.changed = false;
      this.element = element;
      const classList = (element.getAttribute("class") || "").split(/\s+/);
      for (const cls of classList) {
        this.classes.add(cls);
      }
    }
    add(cls) {
      this.classes.add(cls);
      this.changed = true;
    }
    remove(cls) {
      this.classes.delete(cls);
      this.changed = true;
    }
    commit() {
      if (this.changed) {
        let classString = "";
        this.classes.forEach((cls) => (classString += cls + " "));
        this.element.setAttribute("class", classString);
      }
    }
  }
  /**
   * Stores the ClassInfo object applied to a given AttributePart.
   * Used to unset existing values when a new ClassInfo object is applied.
   */
  const previousClassesCache = new WeakMap();
  /**
   * A directive that applies CSS classes. This must be used in the `class`
   * attribute and must be the only part used in the attribute. It takes each
   * property in the `classInfo` argument and adds the property name to the
   * element's `class` if the property value is truthy; if the property value is
   * falsey, the property name is removed from the element's `class`. For example
   * `{foo: bar}` applies the class `foo` if the value of `bar` is truthy.
   * @param classInfo {ClassInfo}
   */
  const classMap = directive((classInfo) => (part) => {
    if (
      !(part instanceof AttributePart) ||
      part instanceof PropertyPart ||
      part.committer.name !== "class" ||
      part.committer.parts.length > 1
    ) {
      throw new Error(
        "The `classMap` directive must be used in the `class` attribute " +
          "and must be the only part in the attribute."
      );
    }
    const { committer } = part;
    const { element } = committer;
    let previousClasses = previousClassesCache.get(part);
    if (previousClasses === undefined) {
      // Write static classes once
      // Use setAttribute() because className isn't a string on SVG elements
      element.setAttribute("class", committer.strings.join(" "));
      previousClassesCache.set(part, (previousClasses = new Set()));
    }
    const classList = element.classList || new ClassList(element);
    // Remove old classes that no longer apply
    // We use forEach() instead of for-of so that re don't require down-level
    // iteration.
    previousClasses.forEach((name) => {
      if (!(name in classInfo)) {
        classList.remove(name);
        previousClasses.delete(name);
      }
    });
    // Add or remove classes based on their classMap value
    for (const name in classInfo) {
      const value = classInfo[name];
      if (value != previousClasses.has(name)) {
        // We explicitly want a loose truthy check of `value` because it seems
        // more convenient that '' and 0 are skipped.
        if (value) {
          classList.add(name);
          previousClasses.add(name);
        } else {
          classList.remove(name);
          previousClasses.delete(name);
        }
      }
    }
    if (typeof classList.commit === "function") {
      classList.commit();
    }
  });
  //# sourceMappingURL=class-map.js.map

  /**
   * @license
   * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * Stores the StyleInfo object applied to a given AttributePart.
   * Used to unset existing values when a new StyleInfo object is applied.
   */
  const previousStylePropertyCache = new WeakMap();
  /**
   * A directive that applies CSS properties to an element.
   *
   * `styleMap` can only be used in the `style` attribute and must be the only
   * expression in the attribute. It takes the property names in the `styleInfo`
   * object and adds the property values as CSS properties. Property names with
   * dashes (`-`) are assumed to be valid CSS property names and set on the
   * element's style object using `setProperty()`. Names without dashes are
   * assumed to be camelCased JavaScript property names and set on the element's
   * style object using property assignment, allowing the style object to
   * translate JavaScript-style names to CSS property names.
   *
   * For example `styleMap({backgroundColor: 'red', 'border-top': '5px', '--size':
   * '0'})` sets the `background-color`, `border-top` and `--size` properties.
   *
   * @param styleInfo {StyleInfo}
   */
  const styleMap = directive((styleInfo) => (part) => {
    if (
      !(part instanceof AttributePart) ||
      part instanceof PropertyPart ||
      part.committer.name !== "style" ||
      part.committer.parts.length > 1
    ) {
      throw new Error(
        "The `styleMap` directive must be used in the style attribute " +
          "and must be the only part in the attribute."
      );
    }
    const { committer } = part;
    const { style } = committer.element;
    let previousStyleProperties = previousStylePropertyCache.get(part);
    if (previousStyleProperties === undefined) {
      // Write static styles once
      style.cssText = committer.strings.join(" ");
      previousStylePropertyCache.set(
        part,
        (previousStyleProperties = new Set())
      );
    }
    // Remove old properties that no longer exist in styleInfo
    // We use forEach() instead of for-of so that re don't require down-level
    // iteration.
    previousStyleProperties.forEach((name) => {
      if (!(name in styleInfo)) {
        previousStyleProperties.delete(name);
        if (name.indexOf("-") === -1) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style[name] = null;
        } else {
          style.removeProperty(name);
        }
      }
    });
    // Add or update properties
    for (const name in styleInfo) {
      previousStyleProperties.add(name);
      if (name.indexOf("-") === -1) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style[name] = styleInfo[name];
      } else {
        style.setProperty(name, styleInfo[name]);
      }
    }
  });
  //# sourceMappingURL=style-map.js.map

  /**
   * A collection of shims that provide minimal functionality of the ES6 collections.
   *
   * These implementations are not meant to be used outside of the ResizeObserver
   * modules as they cover only a limited range of use cases.
   */
  /* eslint-disable require-jsdoc, valid-jsdoc */
  var MapShim = (function () {
    if (typeof Map !== "undefined") {
      return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
      var result = -1;
      arr.some(function (entry, index) {
        if (entry[0] === key) {
          result = index;
          return true;
        }
        return false;
      });
      return result;
    }
    return /** @class */ (function () {
      function class_1() {
        this.__entries__ = [];
      }
      Object.defineProperty(class_1.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function () {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true,
      });
      /**
       * @param {*} key
       * @returns {*}
       */
      class_1.prototype.get = function (key) {
        var index = getIndex(this.__entries__, key);
        var entry = this.__entries__[index];
        return entry && entry[1];
      };
      /**
       * @param {*} key
       * @param {*} value
       * @returns {void}
       */
      class_1.prototype.set = function (key, value) {
        var index = getIndex(this.__entries__, key);
        if (~index) {
          this.__entries__[index][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      /**
       * @param {*} key
       * @returns {void}
       */
      class_1.prototype.delete = function (key) {
        var entries = this.__entries__;
        var index = getIndex(entries, key);
        if (~index) {
          entries.splice(index, 1);
        }
      };
      /**
       * @param {*} key
       * @returns {void}
       */
      class_1.prototype.has = function (key) {
        return !!~getIndex(this.__entries__, key);
      };
      /**
       * @returns {void}
       */
      class_1.prototype.clear = function () {
        this.__entries__.splice(0);
      };
      /**
       * @param {Function} callback
       * @param {*} [ctx=null]
       * @returns {void}
       */
      class_1.prototype.forEach = function (callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }
        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };
      return class_1;
    })();
  })();

  /**
   * Detects whether window and document objects are available in current environment.
   */
  var isBrowser =
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    window.document === document;

  // Returns global object of a current environment.
  var global$1 = (function () {
    if (typeof global !== "undefined" && global.Math === Math) {
      return global;
    }
    if (typeof self !== "undefined" && self.Math === Math) {
      return self;
    }
    if (typeof window !== "undefined" && window.Math === Math) {
      return window;
    }
    // eslint-disable-next-line no-new-func
    return Function("return this")();
  })();

  /**
   * A shim for the requestAnimationFrame which falls back to the setTimeout if
   * first one is not supported.
   *
   * @returns {number} Requests' identifier.
   */
  var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === "function") {
      // It's required to use a bounded function because IE sometimes throws
      // an "Invalid calling object" error if rAF is invoked without the global
      // object on the left hand side.
      return requestAnimationFrame.bind(global$1);
    }
    return function (callback) {
      return setTimeout(function () {
        return callback(Date.now());
      }, 1000 / 60);
    };
  })();

  // Defines minimum timeout before adding a trailing call.
  var trailingTimeout = 2;
  /**
   * Creates a wrapper function which ensures that provided callback will be
   * invoked only once during the specified delay period.
   *
   * @param {Function} callback - Function to be invoked after the delay period.
   * @param {number} delay - Delay after which to invoke callback.
   * @returns {Function}
   */
  function throttle(callback, delay) {
    var leadingCall = false,
      trailingCall = false,
      lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
      if (leadingCall) {
        leadingCall = false;
        callback();
      }
      if (trailingCall) {
        proxy();
      }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
      requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
      var timeStamp = Date.now();
      if (leadingCall) {
        // Reject immediately following calls.
        if (timeStamp - lastCallTime < trailingTimeout) {
          return;
        }
        // Schedule new call to be in invoked when the pending one is resolved.
        // This is important for "transitions" which never actually start
        // immediately so there is a chance that we might miss one if change
        // happens amids the pending invocation.
        trailingCall = true;
      } else {
        leadingCall = true;
        trailingCall = false;
        setTimeout(timeoutCallback, delay);
      }
      lastCallTime = timeStamp;
    }
    return proxy;
  }

  // Minimum delay before invoking the update of observers.
  var REFRESH_DELAY = 20;
  // A list of substrings of CSS properties used to find transition events that
  // might affect dimensions of observed elements.
  var transitionKeys = [
    "top",
    "right",
    "bottom",
    "left",
    "width",
    "height",
    "size",
    "weight",
  ];
  // Check if MutationObserver is available.
  var mutationObserverSupported = typeof MutationObserver !== "undefined";
  /**
   * Singleton controller class which handles updates of ResizeObserver instances.
   */
  var ResizeObserverController = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
      /**
       * Indicates whether DOM listeners have been added.
       *
       * @private {boolean}
       */
      this.connected_ = false;
      /**
       * Tells that controller has subscribed for Mutation Events.
       *
       * @private {boolean}
       */
      this.mutationEventsAdded_ = false;
      /**
       * Keeps reference to the instance of MutationObserver.
       *
       * @private {MutationObserver}
       */
      this.mutationsObserver_ = null;
      /**
       * A list of connected observers.
       *
       * @private {Array<ResizeObserverSPI>}
       */
      this.observers_ = [];
      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }
      // Add listeners if they haven't been added yet.
      if (!this.connected_) {
        this.connect_();
      }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
      var observers = this.observers_;
      var index = observers.indexOf(observer);
      // Remove observer if it's present in registry.
      if (~index) {
        observers.splice(index, 1);
      }
      // Remove listeners if controller has no connected observers.
      if (!observers.length && this.connected_) {
        this.disconnect_();
      }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
      var changesDetected = this.updateObservers_();
      // Continue running updates if changes have been detected as there might
      // be future ones caused by CSS transitions.
      if (changesDetected) {
        this.refresh();
      }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
      // Collect observers that have active observations.
      var activeObservers = this.observers_.filter(function (observer) {
        return observer.gatherActive(), observer.hasActive();
      });
      // Deliver notifications in a separate cycle in order to avoid any
      // collisions between observers, e.g. when multiple instances of
      // ResizeObserver are tracking the same element and the callback of one
      // of them changes content dimensions of the observed target. Sometimes
      // this may result in notifications being blocked for the rest of observers.
      activeObservers.forEach(function (observer) {
        return observer.broadcastActive();
      });
      return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
      // Do nothing if running in a non-browser environment or if listeners
      // have been already added.
      if (!isBrowser || this.connected_) {
        return;
      }
      // Subscription to the "Transitionend" event is used as a workaround for
      // delayed transitions. This way it's possible to capture at least the
      // final state of an element.
      document.addEventListener("transitionend", this.onTransitionEnd_);
      window.addEventListener("resize", this.refresh);
      if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);
        this.mutationsObserver_.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true,
        });
      } else {
        document.addEventListener("DOMSubtreeModified", this.refresh);
        this.mutationEventsAdded_ = true;
      }
      this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
      // Do nothing if running in a non-browser environment or if listeners
      // have been already removed.
      if (!isBrowser || !this.connected_) {
        return;
      }
      document.removeEventListener("transitionend", this.onTransitionEnd_);
      window.removeEventListener("resize", this.refresh);
      if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
      }
      if (this.mutationEventsAdded_) {
        document.removeEventListener("DOMSubtreeModified", this.refresh);
      }
      this.mutationsObserver_ = null;
      this.mutationEventsAdded_ = false;
      this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
      var _b = _a.propertyName,
        propertyName = _b === void 0 ? "" : _b;
      // Detect whether transition may affect dimensions of an element.
      var isReflowProperty = transitionKeys.some(function (key) {
        return !!~propertyName.indexOf(key);
      });
      if (isReflowProperty) {
        this.refresh();
      }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController();
      }
      return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
  })();

  /**
   * Defines non-writable/enumerable properties of the provided target object.
   *
   * @param {Object} target - Object for which to define properties.
   * @param {Object} props - Properties to be defined.
   * @returns {Object} Target object.
   */
  var defineConfigurable = function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
      var key = _a[_i];
      Object.defineProperty(target, key, {
        value: props[key],
        enumerable: false,
        writable: false,
        configurable: true,
      });
    }
    return target;
  };

  /**
   * Returns the global object associated with provided element.
   *
   * @param {Object} target
   * @returns {Object}
   */
  var getWindowOf = function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal =
      target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
  };

  // Placeholder of an empty content rectangle.
  var emptyRect = createRectInit(0, 0, 0, 0);
  /**
   * Converts provided string to a number.
   *
   * @param {number|string} value
   * @returns {number}
   */
  function toFloat(value) {
    return parseFloat(value) || 0;
  }
  /**
   * Extracts borders size from provided styles.
   *
   * @param {CSSStyleDeclaration} styles
   * @param {...string} positions - Borders positions (top, right, ...)
   * @returns {number}
   */
  function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
      var value = styles["border-" + position + "-width"];
      return size + toFloat(value);
    }, 0);
  }
  /**
   * Extracts paddings sizes from provided styles.
   *
   * @param {CSSStyleDeclaration} styles
   * @returns {Object} Paddings box.
   */
  function getPaddings(styles) {
    var positions = ["top", "right", "bottom", "left"];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
      var position = positions_1[_i];
      var value = styles["padding-" + position];
      paddings[position] = toFloat(value);
    }
    return paddings;
  }
  /**
   * Calculates content rectangle of provided SVG element.
   *
   * @param {SVGGraphicsElement} target - Element content rectangle of which needs
   *      to be calculated.
   * @returns {DOMRectInit}
   */
  function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
  }
  /**
   * Calculates content rectangle of provided HTMLElement.
   *
   * @param {HTMLElement} target - Element for which to calculate the content rectangle.
   * @returns {DOMRectInit}
   */
  function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth,
      clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
      return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width),
      height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === "border-box") {
      // Following conditions are required to handle Internet Explorer which
      // doesn't include paddings and borders to computed CSS dimensions.
      //
      // We can say that if CSS dimensions + paddings are equal to the "client"
      // properties then it's either IE, and thus we don't need to subtract
      // anything, or an element merely doesn't have paddings/borders styles.
      if (Math.round(width + horizPad) !== clientWidth) {
        width -= getBordersSize(styles, "left", "right") + horizPad;
      }
      if (Math.round(height + vertPad) !== clientHeight) {
        height -= getBordersSize(styles, "top", "bottom") + vertPad;
      }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
      // In some browsers (only in Firefox, actually) CSS width & height
      // include scroll bars size which can be removed at this step as scroll
      // bars are the only difference between rounded dimensions + paddings
      // and "client" properties, though that is not always true in Chrome.
      var vertScrollbar = Math.round(width + horizPad) - clientWidth;
      var horizScrollbar = Math.round(height + vertPad) - clientHeight;
      // Chrome has a rather weird rounding of "client" properties.
      // E.g. for an element with content width of 314.2px it sometimes gives
      // the client width of 315px and for the width of 314.7px it may give
      // 314px. And it doesn't happen all the time. So just ignore this delta
      // as a non-relevant.
      if (Math.abs(vertScrollbar) !== 1) {
        width -= vertScrollbar;
      }
      if (Math.abs(horizScrollbar) !== 1) {
        height -= horizScrollbar;
      }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
  }
  /**
   * Checks whether provided element is an instance of the SVGGraphicsElement.
   *
   * @param {Element} target - Element to be checked.
   * @returns {boolean}
   */
  var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== "undefined") {
      return function (target) {
        return target instanceof getWindowOf(target).SVGGraphicsElement;
      };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) {
      return (
        target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === "function"
      );
    };
  })();
  /**
   * Checks whether provided element is a document element (<html>).
   *
   * @param {Element} target - Element to be checked.
   * @returns {boolean}
   */
  function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
  }
  /**
   * Calculates an appropriate content rectangle for provided html or svg element.
   *
   * @param {Element} target - Element content rectangle of which needs to be calculated.
   * @returns {DOMRectInit}
   */
  function getContentRect(target) {
    if (!isBrowser) {
      return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
      return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
  }
  /**
   * Creates rectangle with an interface of the DOMRectReadOnly.
   * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
   *
   * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
   * @returns {DOMRectReadOnly}
   */
  function createReadOnlyRect(_a) {
    var x = _a.x,
      y = _a.y,
      width = _a.width,
      height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr =
      typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
      x: x,
      y: y,
      width: width,
      height: height,
      top: y,
      right: x + width,
      bottom: height + y,
      left: x,
    });
    return rect;
  }
  /**
   * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
   * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
   *
   * @param {number} x - X coordinate.
   * @param {number} y - Y coordinate.
   * @param {number} width - Rectangle's width.
   * @param {number} height - Rectangle's height.
   * @returns {DOMRectInit}
   */
  function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
  }

  /**
   * Class that is responsible for computations of the content rectangle of
   * provided DOM element and for keeping track of it's changes.
   */
  var ResizeObservation = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
      /**
       * Broadcasted width of content rectangle.
       *
       * @type {number}
       */
      this.broadcastWidth = 0;
      /**
       * Broadcasted height of content rectangle.
       *
       * @type {number}
       */
      this.broadcastHeight = 0;
      /**
       * Reference to the last observed content rectangle.
       *
       * @private {DOMRectInit}
       */
      this.contentRect_ = createRectInit(0, 0, 0, 0);
      this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
      var rect = getContentRect(this.target);
      this.contentRect_ = rect;
      return (
        rect.width !== this.broadcastWidth ||
        rect.height !== this.broadcastHeight
      );
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
      var rect = this.contentRect_;
      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;
      return rect;
    };
    return ResizeObservation;
  })();

  var ResizeObserverEntry = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);
      // According to the specification following properties are not writable
      // and are also not enumerable in the native implementation.
      //
      // Property accessors are not being used as they'd require to define a
      // private WeakMap storage which may cause memory leaks in browsers that
      // don't support this type of collections.
      defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
  })();

  var ResizeObserverSPI = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
      /**
       * Collection of resize observations that have detected changes in dimensions
       * of elements.
       *
       * @private {Array<ResizeObservation>}
       */
      this.activeObservations_ = [];
      /**
       * Registry of the ResizeObservation instances.
       *
       * @private {Map<Element, ResizeObservation>}
       */
      this.observations_ = new MapShim();
      if (typeof callback !== "function") {
        throw new TypeError(
          "The callback provided as parameter 1 is not a function."
        );
      }
      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      // Do nothing if current environment doesn't have the Element interface.
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      // Do nothing if element is already being observed.
      if (observations.has(target)) {
        return;
      }
      observations.set(target, new ResizeObservation(target));
      this.controller_.addObserver(this);
      // Force the update of observations.
      this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      // Do nothing if current environment doesn't have the Element interface.
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      // Do nothing if element is not being observed.
      if (!observations.has(target)) {
        return;
      }
      observations.delete(target);
      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
      var _this = this;
      this.clearActive();
      this.observations_.forEach(function (observation) {
        if (observation.isActive()) {
          _this.activeObservations_.push(observation);
        }
      });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
      // Do nothing if observer doesn't have active observations.
      if (!this.hasActive()) {
        return;
      }
      var ctx = this.callbackCtx_;
      // Create ResizeObserverEntry instance for every active observation.
      var entries = this.activeObservations_.map(function (observation) {
        return new ResizeObserverEntry(
          observation.target,
          observation.broadcastRect()
        );
      });
      this.callback_.call(ctx, entries, ctx);
      this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
      this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
      return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
  })();

  // Registry of internal observers. If WeakMap is not available use current shim
  // for the Map collection as it has all required methods and because WeakMap
  // can't be fully polyfilled anyway.
  var observers =
    typeof WeakMap !== "undefined" ? new WeakMap() : new MapShim();
  /**
   * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
   * exposing only those methods and properties that are defined in the spec.
   */
  var ResizeObserver = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
      if (!(this instanceof ResizeObserver)) {
        throw new TypeError("Cannot call a class as a function.");
      }
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }
    return ResizeObserver;
  })();
  // Expose public methods of ResizeObserver.
  ["observe", "unobserve", "disconnect"].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
      var _a;
      return (_a = observers.get(this))[method].apply(_a, arguments);
    };
  });

  var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== "undefined") {
      return global$1.ResizeObserver;
    }
    return ResizeObserver;
  })();

  const DEFAULT_HIDE = {
    shuffle: true,
    power_state: true,
    artwork_border: true,
    icon_state: true,
    sound_mode: true,
    runtime: true,
    volume: false,
    controls: false,
    play_pause: false,
    play_stop: true,
    prev: false,
    next: false,
  };
  const ICON = {
    DEFAULT: "mdi:cast",
    DROPDOWN: "mdi:chevron-down",
    GROUP: "mdi:speaker-multiple",
    MENU: "mdi:menu-down",
    MUTE: {
      true: "mdi:volume-off",
      false: "mdi:volume-high",
    },
    NEXT: "mdi:skip-next",
    PLAY: {
      true: "mdi:pause",
      false: "mdi:play",
    },
    POWER: "mdi:power",
    PREV: "mdi:skip-previous",
    SEND: "mdi:send",
    SHUFFLE: "mdi:shuffle",
    STOP: {
      true: "mdi:stop",
      false: "mdi:play",
    },
    VOL_DOWN: "mdi:volume-minus",
    VOL_UP: "mdi:volume-plus",
  };
  const UPDATE_PROPS = [
    "entity",
    "_overflow",
    "break",
    "thumbnail",
    "edit",
    "idle",
  ];

  const PROGRESS_PROPS = [
    "media_duration",
    "media_position",
    "media_position_updated_at",
  ];

  const BREAKPOINT = 390;

  // AIS dom
  const LABEL_SHORTCUT = "Przekieruj media na";

  const MEDIA_INFO = [
    { attr: "media_title" },
    { attr: "media_artist" },
    { attr: "media_series_title" },
    { attr: "media_season", prefix: "S" },
    { attr: "media_episode", prefix: "E" },
    { attr: "app_name" },
  ];

  class MediaPlayerObject {
    constructor(hass, config, entity) {
      this.hass = hass || {};
      this.config = config || {};
      this.entity = entity || {};
      this.state = entity.state;
      this.attr = entity.attributes;
      this.idle = config.idle_view ? this.idleView : false;
      this.active = this.isActive;
    }

    get id() {
      return this.entity.entity_id;
    }

    get icon() {
      return this.attr.icon;
    }

    get isPaused() {
      return this.state === "paused";
    }

    get isPlaying() {
      return this.state === "playing";
    }

    get isIdle() {
      return this.state === "idle";
    }

    get isStandby() {
      return this.state === "standby";
    }

    get isUnavailable() {
      return this.state === "unavailable";
    }

    get isOff() {
      return this.state === "off";
    }

    get isActive() {
      return (!this.isOff && !this.isUnavailable && !this.idle) || false;
    }

    get shuffle() {
      return this.attr.shuffle || false;
    }

    get content() {
      return this.attr.media_content_type || "none";
    }

    get mediaDuration() {
      return this.attr.media_duration || 0;
    }

    get updatedAt() {
      return this.attr.media_position_updated_at || 0;
    }

    get position() {
      return this.attr.media_position || 0;
    }

    get name() {
      return this.attr.friendly_name || "";
    }

    get groupCount() {
      return this.group.length;
    }

    get isGrouped() {
      return this.group.length > 1;
    }

    get group() {
      const groupName = `${this.config.speaker_group.platform}_group`;
      return this.attr[groupName] || [];
    }

    get master() {
      return this.config.entity;
    }

    get isMaster() {
      return this.master === this.config.entity;
    }

    get sources() {
      return this.attr.source_list || [];
    }

    get source() {
      return this.attr.source || "";
    }

    get soundModes() {
      return this.attr.sound_mode_list || [];
    }

    get soundMode() {
      return this.attr.sound_mode || "";
    }

    get muted() {
      return this.attr.is_volume_muted || false;
    }

    get vol() {
      return this.attr.volume_level || 0;
    }

    get picture() {
      return this.attr.entity_picture_local || this.attr.entity_picture;
    }

    get hasArtwork() {
      return (
        this.picture &&
        this.config.artwork !== "none" &&
        this.active &&
        !this.idle
      );
    }

    get mediaInfo() {
      return MEDIA_INFO.map((item) => ({
        text: this.attr[item.attr],
        prefix: "",
        ...item,
      })).filter((item) => item.text);
    }

    get hasProgress() {
      return (
        !this.config.hide.progress &&
        !this.idle &&
        PROGRESS_PROPS.every((prop) => prop in this.attr)
      );
    }

    get progress() {
      return (
        this.position +
        (Date.now() - new Date(this.updatedAt).getTime()) / 1000.0
      );
    }

    get idleView() {
      const idle = this.config.idle_view;
      if (
        (idle.when_idle && this.isIdle) ||
        (idle.when_standby && this.isStandby) ||
        (idle.when_paused && this.isPaused)
      )
        return true;

      // TODO: remove?
      if (!this.updatedAt || !idle.after || this.isPlaying) return false;

      return this.checkIdleAfter(idle.after);
    }

    get trackIdle() {
      return (
        this.active &&
        !this.isPlaying &&
        this.updatedAt &&
        this.config.idle_view &&
        this.config.idle_view.after
      );
    }

    checkIdleAfter(time) {
      const diff = (Date.now() - new Date(this.updatedAt).getTime()) / 1000;
      this.idle = diff > time * 60;
      this.active = this.isActive;
      return this.idle;
    }

    get supportsShuffle() {
      return !(typeof this.attr.shuffle === "undefined");
    }

    get supportsMute() {
      return !(typeof this.attr.is_volume_muted === "undefined");
    }

    getAttribute(attribute) {
      return this.attr[attribute] || "";
    }

    get artwork() {
      return `url(${
        this.attr.entity_picture_local
          ? this.hass.hassUrl(this.picture)
          : this.picture
      })`;
    }

    toggle(e) {
      if (this.config.toggle_power) return this.callService(e, "toggle");
      if (this.isOff) return this.callService(e, "turn_on");
      else this.callService(e, "turn_off");
    }

    toggleMute(e) {
      if (this.config.speaker_group.sync_volume) {
        this.group.forEach((entity) => {
          this.callService(e, "volume_mute", {
            entity_id: entity,
            is_volume_muted: !this.muted,
          });
        });
      } else {
        this.callService(e, "volume_mute", { is_volume_muted: !this.muted });
      }
    }

    toggleShuffle(e) {
      this.callService(e, "shuffle_set", { shuffle: !this.shuffle });
    }

    setSource(e, source) {
      this.callService(e, "select_source", { source });
    }

    setMedia(e, opts) {
      this.callService(e, "play_media", { ...opts });
    }

    playPause(e) {
      this.callService(e, "media_play_pause");
    }

    playStop(e) {
      if (!this.isPlaying) this.callService(e, "media_play");
      else this.callService(e, "media_stop");
    }

    setSoundMode(e, name) {
      this.callService(e, "select_sound_mode", { sound_mode: name });
    }

    next(e) {
      this.callService(e, "media_next_track");
    }

    prev(e) {
      this.callService(e, "media_previous_track");
    }

    stop(e) {
      this.callService(e, "media_stop");
    }

    volumeUp(e) {
      this.callService(e, "volume_up");
    }

    volumeDown(e) {
      this.callService(e, "volume_down");
    }

    seek(e, pos) {
      this.callService(e, "media_seek", { seek_position: pos });
    }

    setVolume(e, vol) {
      if (this.config.speaker_group.sync_volume) {
        this.group.forEach((entity) => {
          const conf =
            this.config.speaker_group.entities.find(
              (entry) => entry.entity_id === entity
            ) || {};
          let offsetVol = vol;
          if (conf.volume_offset) {
            offsetVol += conf.volume_offset / 100;
            if (offsetVol > 1) offsetVol = 1;
            if (offsetVol < 0) offsetVol = 0;
          }
          this.callService(e, "volume_set", {
            entity_id: entity,
            volume_level: offsetVol,
          });
        });
      } else {
        this.callService(e, "volume_set", {
          entity_id: this.config.entity,
          volume_level: vol,
        });
      }
    }

    handleGroupChange(e, entity, checked) {
      const { platform } = this.config.speaker_group;
      const options = { entity_id: entity };
      if (checked) {
        options.master = this.config.entity;
        if (platform === "bluesound") {
          return this.callService(e, `${platform}_JOIN`, options);
        }
        if (platform === "soundtouch") {
          const service = this.isGrouped ? "ADD_ZONE_SLAVE" : "CREATE_ZONE";
          return this.handleSoundtouch(e, service, entity);
        }
        this.callService(e, "join", options, platform);
      } else {
        if (platform === "bluesound") {
          return this.callService(e, `${platform}_UNJOIN`, options);
        }
        if (platform === "soundtouch") {
          return this.handleSoundtouch(e, "REMOVE_ZONE_SLAVE", entity);
        }
        this.callService(e, "unjoin", options, platform);
      }
    }

    handleSoundtouch(e, service, entity) {
      return this.callService(
        e,
        service,
        {
          master: this.master,
          slaves: entity,
        },
        "soundtouch",
        true
      );
    }

    toggleScript(e, id, data = {}) {
      this.callService(
        e,
        id.split(".").pop(),
        {
          ...data,
        },
        "script"
      );
    }

    toggleService(e, id, data = {}) {
      e.stopPropagation();
      const [domain, service] = id.split(".");
      this.hass.callService(domain, service, {
        ...data,
      });
    }

    callService(e, service, inOptions, domain = "media_player", omit = false) {
      e.stopPropagation();
      this.hass.callService(domain, service, {
        ...(!omit && { entity_id: this.config.entity }),
        ...inOptions,
      });
    }
  }

  const style = css`
    :host {
      overflow: visible !important;
      display: block;
      --mmp-scale: var(--mini-media-player-scale, 1);
      --mmp-unit: calc(var(--mmp-scale) * 40px);
      --mmp-name-font-weight: var(--mini-media-player-name-font-weight, 400);
      --mmp-accent-color: var(
        --mini-media-player-accent-color,
        var(--accent-color, #f39c12)
      );
      --mmp-base-color: var(
        --mini-media-player-base-color,
        var(--primary-text-color, #000)
      );
      --mmp-overlay-color: var(
        --mini-media-player-overlay-color,
        rgba(0, 0, 0, 0.5)
      );
      --mmp-overlay-color-stop: var(
        --mini-media-player-overlay-color-stop,
        25%
      );
      --mmp-overlay-base-color: var(
        --mini-media-player-overlay-base-color,
        #fff
      );
      --mmp-overlay-accent-color: var(
        --mini-media-player-overlay-accent-color,
        --mmp-accent-color
      );
      --mmp-text-color: var(
        --mini-media-player-base-color,
        var(--primary-text-color, #000)
      );
      --mmp-media-cover-info-color: var(
        --mini-media-player-media-cover-info-color,
        --mmp-text-color
      );
      --mmp-text-color-inverted: var(--disabled-text-color);
      --mmp-active-color: var(--mmp-accent-color);
      --mmp-button-color: var(
        --mini-media-player-button-color,
        rgba(255, 255, 255, 0.25)
      );
      --mmp-icon-color: var(
        --mini-media-player-icon-color,
        var(
          --mini-media-player-base-color,
          var(--paper-item-icon-color, #44739e)
        )
      );
      --mmp-icon-active-color: var(
        --paper-item-icon-active-color,
        --mmp-active-color
      );
      --mmp-info-opacity: 1;
      --mmp-bg-opacity: var(--mini-media-player-background-opacity, 1);
      --mmp-artwork-opacity: var(--mini-media-player-artwork-opacity, 1);
      --mmp-progress-height: var(--mini-media-player-progress-height, 6px);
      --mdc-theme-primary: var(--mmp-text-color);
      --mdc-theme-on-primary: var(--mmp-text-color);
      --paper-checkbox-unchecked-color: var(--mmp-text-color);
      --paper-checkbox-label-color: var(--mmp-text-color);
      color: var(--mmp-text-color);
    }
    ha-card.--bg {
      --mmp-info-opacity: 0.75;
    }
    ha-card.--has-artwork[artwork*="cover"] {
      --mmp-accent-color: var(
        --mini-media-player-overlay-accent-color,
        var(--mini-media-player-accent-color, var(--accent-color, #f39c12))
      );
      --mmp-text-color: var(--mmp-overlay-base-color);
      --mmp-text-color-inverted: #000;
      --mmp-active-color: rgba(255, 255, 255, 0.5);
      --mmp-icon-color: var(--mmp-text-color);
      --mmp-icon-active-color: var(--mmp-text-color);
      --mmp-info-opacity: 0.75;
      --paper-slider-container-color: var(
        --mini-media-player-overlay-color,
        rgba(255, 255, 255, 0.75)
      );
      --mdc-theme-primary: var(--mmp-text-color);
      --mdc-theme-on-primary: var(--mmp-text-color);
      --paper-checkbox-unchecked-color: var(--mmp-text-color);
      --paper-checkbox-label-color: var(--mmp-text-color);
      color: var(--mmp-text-color);
    }
    ha-card {
      cursor: default;
      display: flex;
      background: transparent;
      overflow: visible;
      padding: 0;
      position: relative;
      color: inherit;
      font-size: calc(var(--mmp-unit) * 0.35);
    }
    ha-card.--group {
      box-shadow: none;
      --mmp-progress-height: var(--mini-media-player-progress-height, 4px);
    }
    ha-card.--more-info {
      cursor: pointer;
    }
    .mmp__bg,
    .mmp-player,
    .mmp__container {
      border-radius: var(--ha-card-border-radius, 0);
    }
    .mmp__container {
      overflow: hidden;
      height: 100%;
      width: 100%;
      position: absolute;
      pointer-events: none;
    }
    ha-card:before {
      content: "";
      padding-top: 0px;
      transition: padding-top 0.5s cubic-bezier(0.21, 0.61, 0.35, 1);
      will-change: padding-top;
    }
    ha-card.--initial .entity__artwork,
    ha-card.--initial .entity__icon {
      animation-duration: 0.001s;
    }
    ha-card.--initial:before,
    ha-card.--initial .mmp-player {
      transition: none;
    }
    header {
      display: none;
    }
    ha-card[artwork="full-cover"].--has-artwork:before {
      padding-top: 56%;
    }
    ha-card[artwork="full-cover"].--has-artwork[content="music"]:before,
    ha-card[artwork="full-cover-fit"].--has-artwork:before {
      padding-top: 100%;
    }
    .mmp__bg {
      background: var(
        --ha-card-background,
        var(--paper-card-background-color, white)
      );
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      opacity: var(--mmp-bg-opacity);
    }
    ha-card[artwork*="cover"].--has-artwork .mmp__bg {
      opacity: var(--mmp-artwork-opacity);
      background: transparent;
    }
    ha-card.--group .mmp__bg {
      background: transparent;
    }
    .cover,
    .cover:before {
      display: block;
      opacity: 0;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transition: opacity 0.75s cubic-bezier(0.21, 0.61, 0.35, 1);
      will-change: opacity;
    }
    .cover {
      animation: fade-in 0.5s cubic-bezier(0.21, 0.61, 0.35, 1);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      border-radius: var(--ha-card-border-radius, 0);
      overflow: hidden;
    }
    .cover:before {
      background: var(--mmp-overlay-color);
      content: "";
    }
    ha-card[artwork*="full-cover"].--has-artwork .mmp-player {
      background: linear-gradient(
        to top,
        var(--mmp-overlay-color) var(--mmp-overlay-color-stop),
        transparent 100%
      );
      border-bottom-left-radius: var(--ha-card-border-radius, 0);
      border-bottom-right-radius: var(--ha-card-border-radius, 0);
    }
    ha-card.--has-artwork .cover,
    ha-card.--has-artwork[artwork="cover"] .cover:before,
    ha-card.--bg .cover {
      opacity: 0.999;
    }
    ha-card[artwork="default"] .cover {
      display: none;
    }
    ha-card.--bg .cover {
      display: block;
    }
    ha-card[artwork="full-cover-fit"].--has-artwork .cover {
      background-color: black;
      background-size: contain;
    }
    .mmp-player {
      align-self: flex-end;
      box-sizing: border-box;
      position: relative;
      padding: 16px;
      transition: padding 0.25s ease-out;
      width: 100%;
      will-change: padding;
    }
    ha-card.--group .mmp-player {
      padding: 2px 0;
    }
    .flex {
      display: flex;
      display: -ms-flexbox;
      display: -webkit-flex;
      flex-direction: row;
    }
    .mmp-player__core {
      position: relative;
    }
    .entity__info {
      justify-content: center;
      display: flex;
      flex-direction: column;
      margin-left: 8px;
      position: relative;
      overflow: hidden;
      user-select: none;
    }
    ha-card.--rtl .entity__info {
      margin-left: auto;
      margin-right: calc(var(--mmp-unit) / 5);
    }
    ha-card[content="movie"] .attr__media_season,
    ha-card[content="movie"] .attr__media_episode {
      display: none;
    }
    .entity__icon {
      color: var(--mmp-icon-color);
    }
    .entity__icon[color] {
      color: var(--mmp-icon-active-color);
    }
    .entity__artwork,
    .entity__icon {
      animation: fade-in 0.25s ease-out;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 100%;
      height: var(--mmp-unit);
      width: var(--mmp-unit);
      min-width: var(--mmp-unit);
      line-height: var(--mmp-unit);
      margin-right: calc(var(--mmp-unit) / 5);
      position: relative;
      text-align: center;
      will-change: border-color;
      transition: border-color 0.25s ease-out;
    }
    ha-card.--rtl .entity__artwork,
    ha-card.--rtl .entity__icon {
      margin-right: auto;
    }
    .entity__artwork[border] {
      border: 2px solid var(--primary-text-color);
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }
    .entity__artwork[border][state="playing"] {
      border-color: var(--mmp-accent-color);
    }
    .entity__info__name,
    .entity__info__media[short] {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .entity__info__name {
      line-height: calc(var(--mmp-unit) / 2);
      color: var(--mmp-text-color);
      font-weight: var(--mmp-name-font-weight);
    }
    .entity__info__media {
      color: var(--secondary-text-color);
      max-height: 6em;
      word-break: break-word;
      opacity: var(--mmp-info-opacity);
      transition: color 0.5s;
    }
    .entity__info__media[short] {
      max-height: calc(var(--mmp-unit) / 2);
      overflow: hidden;
    }
    .attr__app_name {
      display: none;
    }
    .attr__app_name:first-child,
    .attr__app_name:first-of-type {
      display: inline;
    }
    .mmp-player__core[inactive] .entity__info__media {
      color: var(--mmp-text-color);
      max-width: 200px;
      opacity: 0.5;
    }
    .entity__info__media[short-scroll] {
      max-height: calc(var(--mmp-unit) / 2);
      white-space: nowrap;
    }
    .entity__info__media[scroll] > span {
      visibility: hidden;
    }
    .entity__info__media[scroll] > div {
      animation: move linear infinite;
    }
    .entity__info__media[scroll] .marquee {
      animation: slide linear infinite;
    }
    .entity__info__media[scroll] .marquee,
    .entity__info__media[scroll] > div {
      animation-duration: inherit;
      visibility: visible;
    }
    .entity__info__media[scroll] {
      animation-duration: 10s;
      mask-image: linear-gradient(
        to right,
        transparent 0%,
        black 5%,
        black 95%,
        transparent 100%
      );
      -webkit-mask-image: linear-gradient(
        to right,
        transparent 0%,
        black 5%,
        black 95%,
        transparent 100%
      );
    }
    .marquee {
      visibility: hidden;
      position: absolute;
      white-space: nowrap;
    }
    ha-card[artwork*="cover"].--has-artwork .entity__info__media,
    ha-card.--bg .entity__info__media {
      color: var(--mmp-media-cover-info-color);
    }
    .entity__info__media span:before {
      content: " - ";
    }
    .entity__info__media span:first-of-type:before {
      content: "";
    }
    .entity__info__media span:empty {
      display: none;
    }
    .mmp-player__adds {
      margin-left: calc(var(--mmp-unit) * 1.2);
      position: relative;
    }
    ha-card.--rtl .mmp-player__adds {
      margin-left: auto;
      margin-right: calc(var(--mmp-unit) * 1.2);
    }
    .mmp-player__adds > *:nth-child(2) {
      margin-top: 0px;
    }
    mmp-powerstrip {
      flex: 1;
      justify-content: flex-end;
      margin-right: 0;
      margin-left: auto;
      width: auto;
      max-width: 100%;
    }
    mmp-media-controls {
      flex-wrap: wrap;
    }
    ha-card.--flow mmp-powerstrip {
      justify-content: space-between;
      margin-left: auto;
    }
    ha-card.--flow.--rtl mmp-powerstrip {
      margin-right: auto;
    }
    ha-card.--flow .entity__info {
      display: none;
    }
    ha-card.--responsive .mmp-player__adds {
      margin-left: 0;
    }
    ha-card.--responsive.--rtl .mmp-player__adds {
      margin-right: 0;
    }
    ha-card.--responsive .mmp-player__adds > mmp-media-controls {
      padding: 0;
    }
    ha-card.--progress .mmp-player {
      padding-bottom: calc(
        16px + calc(var(--mini-media-player-progress-height, 6px) - 6px)
      );
    }
    ha-card.--progress.--group .mmp-player {
      padding-bottom: calc(
        10px + calc(var(--mini-media-player-progress-height, 6px) - 6px)
      );
    }
    ha-card.--runtime .mmp-player {
      padding-bottom: calc(
        16px + 16px + var(--mini-media-player-progress-height, 0px)
      );
    }
    ha-card.--runtime.--group .mmp-player {
      padding-bottom: calc(
        16px + 12px + var(--mini-media-player-progress-height, 0px)
      );
    }
    ha-card.--inactive .mmp-player {
      padding: 16px;
    }
    ha-card.--inactive.--group .mmp-player {
      padding: 2px 0;
    }
    .mmp-player div:empty {
      display: none;
    }
    @keyframes slide {
      100% {
        transform: translateX(-100%);
      }
    }
    @keyframes move {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }
    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;

  const sharedStyle = css`
    .ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .label {
      margin: 0 8px;
    }
    ha-icon {
      width: calc(var(--mmp-unit) * 0.6);
      height: calc(var(--mmp-unit) * 0.6);
    }
    ha-icon-button {
      width: var(--mmp-unit);
      height: var(--mmp-unit);
      color: var(--mmp-text-color, var(--primary-text-color));
      transition: color 0.25s;
    }
    ha-icon-button[color] {
      color: var(--mmp-accent-color, var(--accent-color)) !important;
      opacity: 1 !important;
    }
    ha-icon-button[inactive] {
      opacity: 0.5;
    }
  `;

  var handleClick = (node, hass, config, actionConfig, entityId) => {
    let e;
    // eslint-disable-next-line default-case
    switch (actionConfig.action) {
      case "more-info": {
        e = new Event("hass-more-info", { composed: true });
        e.detail = {
          entityId: actionConfig.entity || entityId,
        };
        node.dispatchEvent(e);
        break;
      }
      case "navigate": {
        if (!actionConfig.navigation_path) return;
        window.history.pushState(null, "", actionConfig.navigation_path);
        e = new Event("location-changed", { composed: true });
        e.detail = { replace: false };
        window.dispatchEvent(e);
        break;
      }
      case "call-service": {
        if (!actionConfig.service) return;
        const [domain, service] = actionConfig.service.split(".", 2);
        const serviceData = { ...actionConfig.service_data };
        hass.callService(domain, service, serviceData);
        break;
      }
      case "url": {
        if (!actionConfig.url) return;
        window.location.href = actionConfig.url;
      }
    }
  };

  class MiniMediaPlayerGroupItem extends LitElement {
    static get properties() {
      return {
        item: {},
        checked: Boolean,
        disabled: Boolean,
        master: Boolean,
      };
    }

    render() {
      return html`
        <paper-checkbox
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change="${(e) => e.stopPropagation()}"
          @click="${this.handleClick}"
        >
          ${this.item.name} ${this.master ? html`<span>(master)</span>` : ""}
        </paper-checkbox>
      `;
    }

    handleClick(ev) {
      ev.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            entity: this.item.entity_id,
            checked: !this.checked,
          },
        })
      );
    }

    static get styles() {
      return css`
        paper-checkbox {
          padding: 8px 0;
        }
        paper-checkbox > span {
          font-weight: 600;
        }

        ha-card[artwork*="cover"][has-artwork] paper-checkbox[disabled] {
          --paper-checkbox-checkmark-color: rgba(0, 0, 0, 0.5);
        }
        ha-card[artwork*="cover"][has-artwork] paper-checkbox {
          --paper-checkbox-unchecked-color: #ffffff;
          --paper-checkbox-label-color: #ffffff;
        }`;
    }
  }

  customElements.define("mmp-group-item", MiniMediaPlayerGroupItem);

  class MiniMediaPlayerButton extends LitElement {
    render() {
      return html`
        <div class="container">
          <div class="slot-container">
            <slot></slot>
          </div>
          <paper-ripple></paper-ripple>
        </div>
      `;
    }

    static get styles() {
      return css`
        :host {
          position: relative;
          box-sizing: border-box;
          margin: 4px;
          min-width: 0;
          overflow: hidden;
          transition: background 0.5s;
          border-radius: 4px;
          font-weight: 500;
        }
        :host([raised]) {
          background: var(--mmp-button-color);
          min-height: calc(var(--mmp-unit) * 0.8);
          box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
            0px 2px 2px 0px rgba(0, 0, 0, 0.14),
            0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        }
        :host([color]) {
          background: var(--mmp-active-color);
          transition: background 0.25s;
          opacity: 1;
        }
        :host([faded]) {
          opacity: 0.75;
        }
        :host([disabled]) {
          opacity: 0.25;
          pointer-events: none;
        }
        .container {
          height: 100%;
          width: 100%;
        }
        .slot-container {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 8px;
          width: auto;
        }
        paper-ripple {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
        }`;
    }
  }

  customElements.define("mmp-button", MiniMediaPlayerButton);

  class MiniMediaPlayerGroupList extends LitElement {
    static get properties() {
      return {
        entities: {},
        player: {},
        visible: Boolean,
      };
    }

    get group() {
      return this.player.group;
    }

    get master() {
      return this.player.master;
    }

    get isMaster() {
      return this.player.isMaster;
    }

    get isGrouped() {
      return this.player.isGrouped;
    }

    handleGroupChange(ev) {
      const { entity, checked } = ev.detail;
      this.player.handleGroupChange(ev, entity, checked);
    }

    render() {
      if (!this.visible) return html``;
      const { group, isMaster, isGrouped } = this;
      const { id } = this.player;
      return html`
        <div class="mmp-group-list">
          <span class="mmp-group-list__title">GRUPA ODTWARZACZY</span>
          ${this.entities.map((item) => this.renderItem(item, id))}
          <div class="mmp-group-list__buttons">
            <mmp-button
              raised
              ?disabled=${!isGrouped}
              @click=${(e) => this.player.handleGroupChange(e, id, false)}
            >
              <span>Opuść</span>
            </mmp-button>
            ${isGrouped && isMaster
              ? html`
                  <mmp-button
                    raised
                    @click=${(e) =>
                      this.player.handleGroupChange(e, group, false)}
                  >
                    <span>Rozgrupuj</span>
                  </mmp-button>
                `
              : html``}
            <mmp-button
              raised
              ?disabled=${!isMaster}
              @click=${(e) =>
                this.player.handleGroupChange(
                  e,
                  this.entities.map((item) => item.entity_id),
                  true
                )}
            >
              <span
                ><svg
                  style="width:24px;height:24px; vertical-align:middle;"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="M19,19H5V5H15V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
                  />
                </svg>
                Wszystkie</span
              >
            </mmp-button>
          </div>
        </div>
      `;
    }

    renderItem(item, id) {
      const itemId = item.entity_id;
      return html` <mmp-group-item
        @change=${this.handleGroupChange}
        .item=${item}
        .checked=${itemId === id || this.group.includes(itemId)}
        .disabled=${itemId === id || !this.isMaster}
        .master=${itemId === this.master}
      />`;
    }

    static get styles() {
      return css`
        .mmp-group-list {
          display: flex;
          flex-direction: column;
          margin-left: 8px;
          margin-bottom: 8px;
        }
        .mmp-group-list__title {
          font-weight: 500;
          letter-spacing: 0.1em;
          margin: 8px 0 4px;
          text-transform: uppercase;
        }
        .mmp-group-list__buttons {
          display: flex;
        }
        mmp-button {
          margin: 8px 8px 0 0;
          min-width: 0;
          text-transform: uppercase;
          text-align: center;
          width: 50%;
          --mdc-theme-primary: transparent;
        }`;
    }
  }

  customElements.define("mmp-group-list", MiniMediaPlayerGroupList);

  class MiniMediaPlayerDropdown extends LitElement {
    static get properties() {
      return {
        items: [],
        label: String,
        selected: String,
      };
    }

    get selectedId() {
      return this.items.map((item) => item.id).indexOf(this.selected);
    }

    onChange(e) {
      const id = e.target.selected;
      if (id !== this.selectedId && this.items[id]) {
        this.dispatchEvent(
          new CustomEvent("change", {
            detail: this.items[id],
          })
        );
        e.target.selected = -1;
      }
    }

    render() {
      return html`
        <paper-menu-button
          class="mmp-dropdown"
          noink
          no-animations
          .horizontalAlign=${"right"}
          .verticalAlign=${"top"}
          .verticalOffset=${44}
          .dynamicAlign=${true}
          @click=${(e) => e.stopPropagation()}
        >
          ${this.icon
            ? html`
                <ha-icon-button
                  class="mmp-dropdown__button icon"
                  slot="dropdown-trigger"
                  .icon=${ICON.DROPDOWN}
                >
                </ha-icon-button>
              `
            : html`
                <mmp-button
                  class="mmp-dropdown__button"
                  slot="dropdown-trigger"
                >
                  <div>
                    <span class="mmp-dropdown__label ellipsis">
                      ${this.selected || this.label}
                    </span>
                    <ha-icon
                      class="mmp-dropdown__icon"
                      .icon=${ICON.DROPDOWN}
                    ></ha-icon>
                  </div>
                </mmp-button>
              `}
          <paper-listbox
            slot="dropdown-content"
            .selected=${this.selectedId}
            @iron-select=${this.onChange}
          >
            ${this.items.map(
              (item) => html` <paper-item value=${item.id || item.name}>
                ${item.icon ? html`<ha-icon .icon=${item.icon}></ha-icon>` : ""}
                ${item.name
                  ? html`<span class="mmp-dropdown__item__label"
                      >${item.name}</span
                    >`
                  : ""}
              </paper-item>`
            )}
          </paper-listbox>
        </paper-menu-button>
      `;
    }

    static get styles() {
      return [
        sharedStyle,
        css`
          :host {
            display: block;
          }
          :host([faded]) {
            opacity: 0.75;
          }
          :host[small] .mmp-dropdown__label {
            max-width: 60px;
            display: block;
            position: relative;
            width: auto;
            text-transform: initial;
          }
          :host[full] .mmp-dropdown__label {
            max-width: none;
          }
          .mmp-dropdown {
            padding: 0;
            display: block;
          }
          .mmp-dropdown__button {
            display: flex;
            font-size: 1em;
            justify-content: space-between;
            align-items: center;
            height: calc(var(--mmp-unit) - 4px);
            margin: 2px 0;
          }
          .mmp-dropdown__button.icon {
            height: var(--mmp-unit);
            margin: 0;
          }
          .mmp-dropdown__button > div {
            display: flex;
            flex: 1;
            justify-content: space-between;
            align-items: center;
            height: calc(var(--mmp-unit) - 4px);
            max-width: 100%;
          }
          .mmp-dropdown__label {
            text-align: left;
            text-transform: none;
          }
          .mmp-dropdown__icon {
            height: calc(var(--mmp-unit) * 0.6);
            width: calc(var(--mmp-unit) * 0.6);
            min-width: calc(var(--mmp-unit) * 0.6);
          }
          paper-item > *:nth-child(2) {
            margin-left: 4px;
          }
          paper-menu-button[focused] mmp-button ha-icon {
            color: var(--mmp-accent-color);
            transform: rotate(180deg);
          }
          paper-menu-button[focused] ha-icon-button {
            color: var(--mmp-accent-color);
            transform: rotate(180deg);
          }
          paper-menu-button[focused] ha-icon-button[focused] {
            color: var(--mmp-text-color);
            transform: rotate(0deg);
          }
        `,
      ];
    }
  }

  customElements.define("mmp-dropdown", MiniMediaPlayerDropdown);

  class MiniMediaPlayerShortcuts extends LitElement {
    static get properties() {
      return {
        player: {},
        hass: {},
        shortcuts: {},
      };
    }

    get buttons() {
      return this.shortcuts.buttons;
    }

    get list() {
      let i;
      // list of players
      this.shortcuts.list = [];
      const allEntities = Object.keys(this.hass.states);
      for (i = 0; i < allEntities.length; i += 1) {
        if (allEntities[i].startsWith("media_player.")) {
          if (this.hass.states[allEntities[i]].entity_id !== "") {
            const attr = this.hass.states[allEntities[i]].attributes;
            this.shortcuts.list.push({
              name: attr.friendly_name,
              icon: "mdi:speaker",
              id: "ais_exo_player.redirect_media",
              type: "service",
              data: { entity_id: this.hass.states[allEntities[i]].entity_id },
            });
          }
        }
      }
      this.shortcuts.list.push({
        name: "Wyszukaj dostępne odtwarzacze",
        icon: "mdi:sync",
        id: "ais_shell_command.scan_network_for_ais_players",
        type: "service",
      });
      return this.shortcuts.list;
    }

    get show() {
      return !this.shortcuts.hide_when_off || this.player.active;
    }

    get active() {
      return this.player.getAttribute(this.shortcuts.attribute);
    }

    get height() {
      return this.shortcuts.column_height || 36;
    }

    render() {
      if (!this.show) return html``;
      const { active } = this;

      const list = this.list
        ? html`
            <mmp-dropdown
              class="mmp-shortcuts__dropdown"
              @change=${this.handleShortcut}
              .items=${this.list}
              .label=${this.shortcuts.label}
              .selected=${active}
            >
            </mmp-dropdown>
          `
        : "";

      const buttons = this.buttons
        ? html`
            <div class="mmp-shortcuts__buttons">
              ${this.buttons.map(
                (item) => html` <mmp-button
                  style=${`min-height: ${this.height}px;`}
                  raised
                  columns=${this.shortcuts.columns}
                  ?color=${item.id === active}
                  class="mmp-shortcuts__button"
                  @click=${(e) => this.handleShortcut(e, item)}
                >
                  <div align=${this.shortcuts.align_text}>
                    ${item.icon
                      ? html`<ha-icon .icon=${item.icon}></ha-icon>`
                      : ""}
                    ${item.image ? html`<img src=${item.image} />` : ""}
                    ${item.name
                      ? html`<span class="ellipsis">${item.name}</span>`
                      : ""}
                  </div>
                </mmp-button>`
              )}
            </div>
          `
        : "";

      return html` ${buttons} ${list} `;
    }

    handleShortcut(ev, item) {
      const { type, id, data } = item || ev.detail;
      if (type === "source") return this.player.setSource(ev, id);
      if (type === "service") return this.player.toggleService(ev, id, data);
      if (type === "script") return this.player.toggleScript(ev, id, data);
      if (type === "sound_mode") return this.player.setSoundMode(ev, id);
      const options = {
        media_content_type: type,
        media_content_id: id,
      };
      this.player.setMedia(ev, options);
    }

    static get styles() {
      return [
        sharedStyle,
        css`
          .mmp-shortcuts__buttons {
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            margin-top: 8px;
          }
          .mmp-shortcuts__button {
            min-width: calc(50% - 8px);
            flex: 1;
          }
          .mmp-shortcuts__button > div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 0.2em 0;
          }
          .mmp-shortcuts__button > div[align="left"] {
            justify-content: flex-start;
          }
          .mmp-shortcuts__button > div[align="right"] {
            justify-content: flex-end;
          }
          .mmp-shortcuts__button[columns="1"] {
            min-width: calc(100% - 8px);
          }
          .mmp-shortcuts__button[columns="3"] {
            min-width: calc(33.33% - 8px);
          }
          .mmp-shortcuts__button[columns="4"] {
            min-width: calc(25% - 8px);
          }
          .mmp-shortcuts__button[columns="5"] {
            min-width: calc(20% - 8px);
          }
          .mmp-shortcuts__button[columns="6"] {
            min-width: calc(16.66% - 8px);
          }
          .mmp-shortcuts__button > div > span {
            line-height: calc(var(--mmp-unit) * 0.6);
            text-transform: initial;
          }
          .mmp-shortcuts__button > div > ha-icon {
            width: calc(var(--mmp-unit) * 0.6);
            height: calc(var(--mmp-unit) * 0.6);
          }
          .mmp-shortcuts__button > div > *:nth-child(2) {
            margin-left: 4px;
          }
          .mmp-shortcuts__button > div > img {
            height: 24px;
          }
        `,
      ];
    }
  }

  customElements.define("mmp-shortcuts", MiniMediaPlayerShortcuts);

  // import getLabel from '../utils/getLabel';

  class MiniMediaPlayerTts extends LitElement {
    static get properties() {
      return {
        hass: {},
        config: {},
        player: {},
      };
    }

    get label() {
      // return getLabel(this.hass, 'ui.card.media_player.text_to_speak', 'Play');
      // AIS dom
      return "Wyślij media lub tekst do odtwarzaczy";
    }

    get input() {
      return this.shadowRoot.getElementById("tts-input");
    }

    get message() {
      return this.input.value;
    }

    render() {
      return html`
        <paper-input
          id="tts-input"
          class="mmp-tts__input"
          no-label-float
          placeholder="${this.label}..."
          @keypress=${this.handleTtsKeyPres}
          @click=${(e) => e.stopPropagation()}
        >
        </paper-input>
        <paper-icon-button
          class="mmp-tts__button"
          icon="mdi:play-outline"
          @click=${this.handleTts}
        >
        </paper-icon-button>
      `;
    }

    validURL(str) {
      const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    }

    handleTtsKeyPres(e) {
      if (e.charCode !== 13) {
        e.stopPropagation();
        return true;
      }
      this.handleTts(e);
    }

    handleTts(e) {
      const { config, message } = this;
      const opts = {
        message,
        entity_id: config.entity_id || this.player.id,
        ...(config.entity_id === "group" && { entity_id: this.player.group }),
      };
      if (config.language) opts.language = config.language;
      if (config.platform === "alexa")
        this.hass.callService("notify", "alexa_media", {
          message,
          data: { type: config.type || "tts" },
          target: opts.entity_id,
        });
      else if (config.platform === "sonos")
        this.hass.callService("script", "sonos_say", {
          sonos_entity: opts.entity_id,
          volume: config.volume || 0.5,
          message,
        });
      else if (config.platform === "webos")
        this.hass.callService(
          "notify",
          opts.entity_id.split(".").slice(-1)[0],
          { message }
        );
      else if (config.platform === "ga")
        this.hass.callService("notify", "ga_broadcast", { message });
      else if (config.platform === "ais")
        this.hass.callService("ais_exo_player", "play_text_or_url", {
          text: message,
        });
      else this.hass.callService("tts", `${config.platform}_say`, opts);
      e.stopPropagation();
      // this.reset();
    }

    reset() {
      this.input.value = "";
    }

    static get styles() {
      return css`
        :host {
          align-items: center;
          margin-left: 8px;
          display: flex;
        }
        .mmp-tts__input {
          cursor: text;
          flex: 1;
          margin-right: 8px;
          --paper-input-container-input: {
            font-size: 1em;
          }
        }
        ha-card[rtl] .mmp-tts__input {
          margin-right: auto;
          margin-left: 8px;
        }
        .mmp-tts__button {
          margin: 0;
          height: 30px;
          padding: 0 0.4em;
        }
        paper-input {
          opacity: 0.75;
          --paper-input-container-color: var(--mmp-text-color);
          --paper-input-container-input-color: var(--mmp-text-color);
          --paper-input-container-focus-color: var(--mmp-text-color);
          --paper-input-container: {
            padding: 0;
          }
        }
        paper-input[focused] {
          opacity: 1;
        }

        ha-card[artwork*="cover"][has-artwork] paper-input {
          --paper-input-container-color: #ffffff;
          --paper-input-container-input-color: #ffffff;
          --paper-input-container-focus-color: #ffffff;
        }`;
    }
  }

  customElements.define("mmp-tts", MiniMediaPlayerTts);

  var convertProgress = (duration) => {
    let seconds = parseInt(duration % 60, 10);
    let minutes = parseInt((duration / 60) % 60, 10);
    let hours = parseInt((duration / (60 * 60)) % 24, 10);

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    if (hours === "00" && minutes === "00" && seconds === "00") {
      return "";
    }
    return `${hours !== "00" ? `${hours}:` : ""}${minutes}:${seconds}`;
  };

  class MiniMediaPlayerProgress extends LitElement {
    static get properties() {
      return {
        _player: {},
        showTime: Boolean,
        progress: Number,
        duration: Number,
        tracker: {},
        seekProgress: Number,
        seekWidth: Number,
        track: Boolean,
      };
    }

    set player(player) {
      this._player = player;
      if (this.hasProgress) {
        this.trackProgress();
      }
    }

    get duration() {
      return this.player.mediaDuration;
    }

    get player() {
      return this._player;
    }

    get hasProgress() {
      return this.player.hasProgress;
    }

    get width() {
      return this.shadowRoot.querySelector(".mmp-progress").offsetWidth;
    }

    get offset() {
      return this.getBoundingClientRect().left;
    }

    get classes() {
      return classMap({
        transiting: !this.seekProgress,
        seeking: this.seekProgress,
      });
    }

    render() {
      return html`
        <div
          class="mmp-progress"
          @touchstart=${this.initSeek}
          @touchend=${this.handleSeek}
          @mousedown=${this.initSeek}
          @mouseup=${this.handleSeek}
          @mouseleave=${this.resetSeek}
          @click=${(e) => e.stopPropagation()}
          ?paused=${!this.player.isPlaying}
        >
          ${this.showTime
            ? html`
                <div class="mmp-progress__duration">
                  <span
                    >${convertProgress(
                      this.seekProgress || this.progress
                    )}</span
                  >
                  <span>${convertProgress(this.duration)}</span>
                </div>
              `
            : ""}
          <paper-progress
            class=${this.classes}
            value=${this.seekProgress || this.progress}
            max=${this.duration}
          >
          </paper-progress>
        </div>
      `;
    }

    trackProgress() {
      this.progress = this.player.progress;
      if (!this.tracker)
        this.tracker = setInterval(() => this.trackProgress(), 1000);
      if (!this.player.isPlaying) {
        clearInterval(this.tracker);
        this.tracker = null;
      }
    }

    initSeek(e) {
      const x = e.offsetX || e.touches[0].pageX - this.offset;
      this.seekWidth = this.width;
      this.seekProgress = this.calcProgress(x);
      this.addEventListener("touchmove", this.moveSeek);
      this.addEventListener("mousemove", this.moveSeek);
    }

    resetSeek() {
      this.seekProgress = null;
      this.removeEventListener("touchmove", this.moveSeek);
      this.removeEventListener("mousemove", this.moveSeek);
    }

    moveSeek(e) {
      e.preventDefault();
      const x = e.offsetX || e.touches[0].pageX - this.offset;
      this.seekProgress = this.calcProgress(x);
    }

    handleSeek(e) {
      this.resetSeek();
      const x = e.offsetX || e.changedTouches[0].pageX - this.offset;
      const pos = this.calcProgress(x);
      this.player.seek(e, pos);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.resetSeek();
      clearInterval(this.tracker);
      this.tracker = null;
    }

    connectedCallback() {
      super.connectedCallback();
      if (this.hasProgress) {
        this.trackProgress();
      }
    }

    calcProgress(x) {
      const pos = (x / this.seekWidth) * this.duration;
      return Math.min(Math.max(pos, 0.1), this.duration);
    }

    static get styles() {
      return css`
        .mmp-progress {
          cursor: pointer;
          left: 0;
          right: 0;
          bottom: 0;
          position: absolute;
          pointer-events: auto;
          min-height: calc(var(--mmp-progress-height) + 10px);
        }
        .mmp-progress__duration {
          left: calc(var(--ha-card-border-radius, 4px) / 2);
          right: calc(var(--ha-card-border-radius, 4px) / 2);
          bottom: calc(var(--mmp-progress-height) + 6px);
          position: absolute;
          display: flex;
          justify-content: space-between;
          font-size: 0.8em;
          padding: 0 6px;
          z-index: 2;
        }
        paper-progress {
          height: var(--mmp-progress-height);
          --paper-progress-height: var(--mmp-progress-height);
          bottom: 0;
          position: absolute;
          width: 100%;
          transition: height 0;
          z-index: 1;
          --paper-progress-active-color: var(--mmp-accent-color);
          --paper-progress-container-color: rgba(100, 100, 100, 0.15);
          --paper-progress-transition-duration: 1s;
          --paper-progress-transition-timing-function: linear;
          --paper-progress-transition-delay: 0s;
        }
        paper-progress.seeking {
          transition: height 0.15s ease-out;
          height: calc(var(--mmp-progress-height) + 4px);
          --paper-progress-height: calc(var(--mmp-progress-height) + 4px);
        }
        .mmp-progress[paused] paper-progress {
          --paper-progress-active-color: var(
            --disabled-text-color,
            rgba(150, 150, 150, 0.5)
          );
        }`;
    }
  }

  customElements.define("mmp-progress", MiniMediaPlayerProgress);

  class MiniMediaPlayerSourceMenu extends LitElement {
    static get properties() {
      return {
        player: {},
        icon: Boolean,
      };
    }

    get source() {
      return this.player.source;
    }

    get sources() {
      return this.player.sources.map((source) => ({
        name: source,
        id: source,
        type: "source",
      }));
    }

    render() {
      return html`
        <mmp-dropdown
          @change=${this.handleSource}
          .items=${this.sources}
          .label=${this.source}
          .selected=${this.source}
          .icon=${this.icon}
        ></mmp-dropdown>
      `;
    }

    handleSource(ev) {
      const { id } = ev.detail;
      this.player.setSource(ev, id);
    }

    static get styles() {
      return css`
        :host {
          max-width: 120px;
          min-width: var(--mmp-unit);
        }
        :host([full]) {
          max-width: none;
        }`;
    }
  }

  customElements.define("mmp-source-menu", MiniMediaPlayerSourceMenu);

  class MiniMediaPlayerSoundMenu extends LitElement {
    static get properties() {
      return {
        player: {},
        selected: String,
        icon: Boolean,
      };
    }

    get mode() {
      return this.player.soundMode;
    }

    get modes() {
      return this.player.soundModes.map((mode) => ({
        name: mode,
        id: mode,
        type: "soundMode",
      }));
    }

    render() {
      return html`
        <mmp-dropdown
          @change=${this.handleChange}
          .items=${this.modes}
          .label=${this.mode}
          .selected=${this.selected || this.mode}
          .icon=${this.icon}
        ></mmp-dropdown>
      `;
    }

    handleChange(ev) {
      const { id } = ev.detail;
      this.player.setSoundMode(ev, id);
      this.selected = id;
    }

    static get styles() {
      return css`
        :host {
          max-width: 120px;
          min-width: var(--mmp-unit);
        }
        :host([full]) {
          max-width: none;
        }`;
    }
  }

  customElements.define("mmp-sound-menu", MiniMediaPlayerSoundMenu);

  class MiniMediaPlayerMediaControls extends LitElement {
    static get properties() {
      return {
        player: {},
        config: {},
        break: Boolean,
      };
    }

    get showShuffle() {
      return !this.config.hide.shuffle && this.player.supportsShuffle;
    }

    get maxVol() {
      return this.config.max_volume || 100;
    }

    get minVol() {
      return this.config.min_volume || 0;
    }

    render() {
      const { hide } = this.config;
      return html`
        ${!hide.volume ? this.renderVolControls(this.player.muted) : html``}
        ${this.showShuffle
          ? html`
              <div class="flex mmp-media-controls__shuffle">
                <ha-icon-button
                  class="shuffle-button"
                  @click=${(e) => this.player.toggleShuffle(e)}
                  .icon=${ICON.SHUFFLE}
                  ?color=${this.player.shuffle}
                >
                </ha-icon-button>
              </div>
            `
          : html``}
        ${!hide.controls
          ? html`
              <div
                class="flex mmp-media-controls__media"
                ?flow=${this.config.flow || this.break}
              >
                ${!hide.prev
                  ? html` <ha-icon-button
                      @click=${(e) => this.player.prev(e)}
                      .icon=${ICON.PREV}
                    >
                    </ha-icon-button>`
                  : ""}
                ${this.renderPlayButtons()}
                ${!hide.next
                  ? html` <ha-icon-button
                      @click=${(e) => this.player.next(e)}
                      .icon=${ICON.NEXT}
                    >
                    </ha-icon-button>`
                  : ""}
              </div>
            `
          : html``}
      `;
    }

    renderVolControls(muted) {
      if (this.config.volume_stateless) return this.renderVolButtons(muted);
      else return this.renderVolSlider(muted);
    }

    renderVolSlider(muted) {
      return html` <div class="mmp-media-controls__volume --slider flex">
        ${this.renderMuteButton(muted)}
        <ha-slider
          @change=${this.handleVolumeChange}
          @click=${(e) => e.stopPropagation()}
          ?disabled=${muted}
          min=${this.minVol}
          max=${this.maxVol}
          value=${this.player.vol * 100}
          dir=${"ltr"}
          ignore-bar-touch
          pin
        >
        </ha-slider>
      </div>`;
    }

    renderVolButtons(muted) {
      return html` <div class="mmp-media-controls__volume --buttons flex">
        ${this.renderMuteButton(muted)}
        <ha-icon-button
          @click=${(e) => this.player.volumeDown(e)}
          .icon=${ICON.VOL_DOWN}
        >
        </ha-icon-button>
        <ha-icon-button
          @click=${(e) => this.player.volumeUp(e)}
          .icon=${ICON.VOL_UP}
        >
        </ha-icon-button>
      </div>`;
    }

    renderMuteButton(muted) {
      if (this.config.hide.mute) return;
      switch (this.config.replace_mute) {
        case "play":
        case "play_pause":
          return html`
            <ha-icon-button
              @click=${(e) => this.player.playPause(e)}
              .icon=${ICON.PLAY[this.player.isPlaying]}
            >
            </ha-icon-button>
          `;
        case "stop":
          return html`
            <ha-icon-button
              @click=${(e) => this.player.stop(e)}
              .icon=${ICON.STOP.true}
            >
            </ha-icon-button>
          `;
        case "play_stop":
          return html`
            <ha-icon-button
              @click=${(e) => this.player.playStop(e)}
              .icon=${ICON.STOP[this.player.isPlaying]}
            >
            </ha-icon-button>
          `;
        case "next":
          return html`
            <ha-icon-button
              @click=${(e) => this.player.next(e)}
              .icon=${ICON.NEXT}
            >
            </ha-icon-button>
          `;
        default:
          if (!this.player.supportsMute) return;
          return html`
            <ha-icon-button
              @click=${(e) => this.player.toggleMute(e)}
              .icon=${ICON.MUTE[muted]}
            >
            </ha-icon-button>
          `;
      }
    }

    renderPlayButtons() {
      const { hide } = this.config;
      return html`
        ${!hide.play_pause
          ? html`
              <ha-icon-button
                @click=${(e) => this.player.playPause(e)}
                .icon=${ICON.PLAY[this.player.isPlaying]}
              >
              </ha-icon-button>
            `
          : html``}
        ${!hide.play_stop
          ? html`
              <ha-icon-button
                @click=${(e) => this.handleStop(e)}
                .icon=${hide.play_pause
                  ? ICON.STOP[this.player.isPlaying]
                  : ICON.STOP.true}
              >
              </ha-icon-button>
            `
          : html``}
      `;
    }

    handleStop(e) {
      return this.config.hide.play_pause
        ? this.player.playStop(e)
        : this.player.stop(e);
    }

    handleVolumeChange(ev) {
      const vol = parseFloat(ev.target.value) / 100;
      this.player.setVolume(ev, vol);
    }

    static get styles() {
      return [
        sharedStyle,
        css`
          :host {
            display: flex;
            width: 100%;
            justify-content: space-between;
          }
          .flex {
            display: flex;
            flex: 1;
            justify-content: space-between;
          }
          ha-slider {
            max-width: none;
            min-width: 100px;
            width: 100%;
          }
          ha-icon-button {
            min-width: var(--mmp-unit);
          }
          .mmp-media-controls__volume {
            flex: 100;
            max-height: var(--mmp-unit);
          }
          .mmp-media-controls__volume.--buttons {
            justify-content: left;
          }
          .mmp-media-controls__media {
            margin-right: 0;
            margin-left: auto;
            justify-content: inherit;
          }
          .mmp-media-controls__media[flow] {
            max-width: none;
            justify-content: space-between;
          }
          .mmp-media-controls__shuffle {
            flex: 3;
            flex-shrink: 200;
            justify-content: center;
          }
          .mmp-media-controls__shuffle ha-icon-button {
            height: 36px;
            width: 36px;
            min-width: 36px;
            margin: 2px;
          }
        `,
      ];
    }
  }

  customElements.define("mmp-media-controls", MiniMediaPlayerMediaControls);

  const getLabel = (hass, label, fallback = "unknown") => {
    const lang = hass.selectedLanguage || hass.language;
    const resources = hass.resources[lang];
    return resources && resources[label] ? resources[label] : fallback;
  };

  class MiniMediaPlayerPowerstrip extends LitElement {
    static get properties() {
      return {
        hass: {},
        player: {},
        config: {},
        groupVisible: Boolean,
        idle: Boolean,
      };
    }

    get icon() {
      return this.config.speaker_group.icon || ICON.GROUP;
    }

    get showGroupButton() {
      return this.config.speaker_group.entities;
    }

    get showPowerButton() {
      return !this.config.hide.power;
    }

    get powerColor() {
      return this.player.active && !this.config.hide.power_state;
    }

    get sourceSize() {
      return this.config.source === "icon" || this.hasControls || this.idle;
    }

    get soundSize() {
      return this.config.sound_mode === "icon" || this.hasControls || this.idle;
    }

    get hasControls() {
      return (
        this.player.active &&
        this.config.hide.controls !== this.config.hide.volume
      );
    }

    get hasSource() {
      return this.player.sources.length > 0 && !this.config.hide.source;
    }

    get hasSoundMode() {
      return this.player.soundModes.length > 0 && !this.config.hide.sound_mode;
    }

    render() {
      if (this.player.isUnavailable)
        return html`
          <span class="label ellipsis">
            ${getLabel(this.hass, "state.default.unavailable", "Unavailable")}
          </span>
        `;

      return html`
        ${this.idle ? this.renderIdleView : ""}
        ${this.hasControls
          ? html`
              <mmp-media-controls .player=${this.player} .config=${this.config}>
              </mmp-media-controls>
            `
          : ""}
        ${this.hasSource
          ? html` <mmp-source-menu
              .player=${this.player}
              .icon=${this.sourceSize}
              ?full=${this.config.source === "full"}
            >
            </mmp-source-menu>`
          : ""}
        ${this.hasSoundMode
          ? html` <mmp-sound-menu
              .player=${this.player}
              .icon=${this.soundSize}
              ?full=${this.config.sound_mode === "full"}
            >
            </mmp-sound-menu>`
          : ""}
        ${this.showGroupButton
          ? html` <ha-icon-button
              class="group-button"
              .icon=${this.icon}
              ?inactive=${!this.player.isGrouped}
              ?color=${this.groupVisible}
              @click=${this.handleGroupClick}
            >
            </ha-icon-button>`
          : ""}
        ${this.showPowerButton
          ? html` <ha-icon-button
              class="power-button"
              .icon=${ICON.POWER}
              @click=${(e) => this.player.toggle(e)}
              ?color=${this.powerColor}
            >
            </ha-icon-button>`
          : ""}
      `;
    }

    handleGroupClick(ev) {
      ev.stopPropagation();
      this.dispatchEvent(new CustomEvent("toggleGroupList"));
    }

    get renderIdleView() {
      if (this.player.isPaused)
        return html` <ha-icon-button
          .icon=${ICON.PLAY[this.player.isPlaying]}
          @click=${(e) => this.player.playPause(e)}
        >
        </ha-icon-button>`;
      else
        return html`
          <span class="label ellipsis">
            ${getLabel(this.hass, "state.media_player.idle", "Idle")}
          </span>
        `;
    }

    static get styles() {
      return [
        sharedStyle,
        css`
          :host {
            display: flex;
            line-height: var(--mmp-unit);
            max-height: var(--mmp-unit);
          }
          :host([flow]) mmp-media-controls {
            max-width: unset;
          }
          mmp-media-controls {
            max-width: calc(var(--mmp-unit) * 5);
            line-height: initial;
            justify-content: flex-end;
          }
          .group-button {
            height: calc(var(--mmp-unit) * 0.85);
            width: calc(var(--mmp-unit) * 0.85);
            min-width: calc(var(--mmp-unit) * 0.85);
            margin: 3px;
          }
          ha-icon-button {
            min-width: var(--mmp-unit);
          }
        `,
      ];
    }
  }

  customElements.define("mmp-powerstrip", MiniMediaPlayerPowerstrip);

  if (!customElements.get("ha-slider")) {
    customElements.define(
      "ha-slider",
      class extends customElements.get("paper-slider") {}
    );
  }

  if (!customElements.get("ha-icon-button")) {
    customElements.define(
      "ha-icon-button",
      class extends customElements.get("paper-icon-button") {}
    );
  }

  if (!customElements.get("ha-icon")) {
    customElements.define(
      "ha-icon",
      class extends customElements.get("iron-icon") {}
    );
  }

  class MiniMediaPlayer extends LitElement {
    constructor() {
      super();
      this._overflow = false;
      this.initial = true;
      this.picture = false;
      this.thumbnail = false;
      this.edit = false;
      this.rtl = false;
    }

    static get properties() {
      return {
        _hass: {},
        config: {},
        entity: {},
        player: {},
        _overflow: Boolean,
        break: Boolean,
        initial: Boolean,
        picture: String,
        thumbnail: String,
        edit: Boolean,
        rtl: Boolean,
        idle: Boolean,
      };
    }

    static get styles() {
      return [sharedStyle, style];
    }

    set hass(hass) {
      if (!hass) return;
      const entity = hass.states[this.config.entity];
      this._hass = hass;
      if (entity && this.entity !== entity) {
        this.entity = entity;
        this.player = new MediaPlayerObject(hass, this.config, entity);
        this.rtl = this.computeRTL(hass);
        this.idle = this.player.idle;
        if (this.player.trackIdle) this.updateIdleStatus();
      }
      // ais
      const allEntities = Object.keys(hass.states);
      this.ais_speaker_group_entities = [];
      let i;
      for (i = 0; i < allEntities.length; i += 1) {
        if (allEntities[i].startsWith("media_player.")) {
          const attr = hass.states[allEntities[i]].attributes;
          this.ais_speaker_group_entities.push({
            entity_id: hass.states[allEntities[i]].entity_id,
            name: attr.friendly_name || "Głośnik",
          });
        }
      }
      this.config.speaker_group.show_group_count = true;
      this.config.speaker_group.platform = "ais_exo_player";
      this.config.speaker_group.entities = this.ais_speaker_group_entities;
    }

    get hass() {
      return this._hass;
    }

    set overflow(v) {
      if (this._overflow !== v) this._overflow = v;
    }

    get overflow() {
      return this._overflow;
    }

    get name() {
      return this.config.name || this.player.name;
    }

    setConfig(config) {
      if (!config.entity || config.entity.split(".")[0] !== "media_player")
        throw new Error(
          "Specify an entity from within the media_player domain."
        );

      const conf = {
        artwork: "default",
        info: "default",
        more_info: true,
        source: "default",
        sound_mode: "default",
        toggle_power: true,
        tap_action: {
          action: "more-info",
        },
        ...config,
        hide: { ...DEFAULT_HIDE, ...config.hide },
        speaker_group: {
          show_group_count: true,
          platform: "sonos",
          ...config.sonos,
          ...config.speaker_group,
        },
        shortcuts: {
          label: LABEL_SHORTCUT,
          ...config.shortcuts,
        },
      };
      conf.max_volume = Number(conf.max_volume) || 100;
      conf.min_volume = Number(conf.min_volume) || 0;
      conf.collapse = conf.hide.controls || conf.hide.volume;
      conf.info = conf.collapse && conf.info !== "scroll" ? "short" : conf.info;
      conf.flow = conf.hide.icon && conf.hide.name && conf.hide.info;

      this.config = conf;
    }

    shouldUpdate(changedProps) {
      if (this.break === undefined) this.computeRect(this);
      return UPDATE_PROPS.some((prop) => changedProps.has(prop)) && this.player;
    }

    firstUpdated() {
      const ro = new index((entries) => {
        entries.forEach((entry) => {
          window.requestAnimationFrame(() => {
            if (this.config.info === "scroll") this.computeOverflow();
            if (!this._resizeTimer) {
              this.computeRect(entry);
              this._resizeTimer = setTimeout(() => {
                this._resizeTimer = null;
                this.computeRect(this._resizeEntry);
              }, 250);
            }
            this._resizeEntry = entry;
          });
        });
      });
      ro.observe(this);
      setTimeout(() => (this.initial = false), 250);
      this.edit = this.config.speaker_group.expanded || false;
    }

    updated() {
      if (this.config.info === "scroll")
        setTimeout(() => {
          this.computeOverflow();
        }, 10);
    }

    render({ config } = this) {
      const artwork = this.computeArtwork();

      return html`
        <ha-card
          class=${this.computeClasses()}
          style=${this.computeStyles()}
          @click=${(e) => this.handlePopup(e)}
          artwork=${config.artwork}
          content=${this.player.content}
        >
          <div class="mmp__bg">
            ${this.renderArtwork(artwork)}
          </div>
          <div class="mmp-player">
            <div class="mmp-player__core flex" ?inactive=${this.player.idle}>
              ${this.renderIcon(artwork)}
              <div class="entity__info">
                ${this.renderEntityName()} ${this.renderMediaInfo()}
              </div>
              <mmp-powerstrip
                @toggleGroupList=${this.toggleGroupList}
                .hass=${this.hass}
                .player=${this.player}
                .config=${config}
                .groupVisible=${this.edit}
                .idle=${this.idle}
                ?flow=${config.flow}
              >
              </mmp-powerstrip>
            </div>
            <div class="mmp-player__adds">
              ${!config.collapse && this.player.active
                ? html`
                    <mmp-media-controls
                      .player=${this.player}
                      .config=${config}
                      .break=${this.break}
                    >
                    </mmp-media-controls>
                  `
                : ""}
              <mmp-shortcuts
                .player=${this.player}
                .hass=${this.hass}
                .shortcuts=${config.shortcuts}
              >
              </mmp-shortcuts>
              ${config.tts
                ? html`
                    <mmp-tts
                      .config=${config.tts}
                      .hass=${this.hass}
                      .player=${this.player}
                    >
                    </mmp-tts>
                  `
                : ""}
              <mmp-group-list
                .visible=${this.edit}
                .entities=${config.speaker_group.entities}
                .player=${this.player}
              >
              </mmp-group-list>
            </div>
          </div>
          <div class="mmp__container">
            ${this.player.active && this.player.hasProgress
              ? html`
                  <mmp-progress
                    .player=${this.player}
                    .showTime=${!this.config.hide.runtime}
                  >
                  </mmp-progress>
                `
              : ""}
          </div>
        </ha-card>
      `;
    }

    renderArtwork(artwork) {
      if (!this.thumbnail && !this.config.background) return;

      const url =
        this.config.background &&
        (!artwork || this.config.artwork === "default")
          ? `url(${this.config.background})`
          : this.thumbnail;

      return html`<div class="cover" style="background-image: ${url};"></div>`;
    }

    handlePopup(e) {
      e.stopPropagation();
      handleClick(
        this,
        this._hass,
        this.config,
        this.config.tap_action,
        this.player.id
      );
    }

    renderIcon(artwork) {
      if (this.config.hide.icon) return;
      if (this.player.active && artwork && this.config.artwork === "default")
        return html` <div
          class="entity__artwork"
          style="background-image: ${this.thumbnail};"
          ?border=${!this.config.hide.artwork_border}
          state=${this.player.state}
        ></div>`;

      const state = !this.config.hide.icon_state && this.player.isActive;
      return html` <div class="entity__icon" ?color=${state}>
        <ha-icon .icon=${this.computeIcon()}></ha-icon>
      </div>`;
    }

    renderEntityName() {
      if (this.config.hide.name) return;
      return html` <div class="entity__info__name">
        ${this.name} ${this.speakerCount()}
      </div>`;
    }

    renderMediaInfo() {
      if (this.config.hide.info) return;
      const items = this.player.mediaInfo;
      return html` <div
        class="entity__info__media"
        ?short=${this.config.info === "short" || !this.player.active}
        ?short-scroll=${this.config.info === "scroll"}
        ?scroll=${this.overflow}
        style="animation-duration: ${this.overflow}s;"
      >
        ${this.config.info === "scroll"
          ? html` <div>
              <div class="marquee">
                ${items.map(
                  (i) =>
                    html`<span class=${`attr__${i.attr}`}
                      >${i.prefix + i.text}</span
                    >`
                )}
              </div>
            </div>`
          : ""}
        ${items.map(
          (i) =>
            html`<span class=${`attr__${i.attr}`}>${i.prefix + i.text}</span>`
        )}
      </div>`;
    }

    speakerCount() {
      if (this.config.speaker_group.show_group_count) {
        const count = this.player.groupCount;
        return count > 1 ? ` +${count - 1}` : "";
      }
    }

    computeClasses({ config } = this) {
      return classMap({
        "--responsive": this.break || config.hide.icon,
        "--initial": this.initial,
        "--bg": config.background,
        "--group": config.group,
        "--more-info": config.tap_action !== "none",
        "--has-artwork": this.player.hasArtwork && this.thumbnail,
        "--flow": config.flow,
        "--collapse": config.collapse,
        "--rtl": this.rtl,
        "--progress": this.player.hasProgress,
        "--runtime": !config.hide.runtime && this.player.hasProgress,
        "--inactive": !this.player.isActive,
      });
    }

    computeStyles() {
      const { scale } = this.config;
      return styleMap({
        ...(scale && { "--mmp-unit": `${40 * scale}px` }),
      });
    }

    computeArtwork() {
      const { picture, hasArtwork } = this.player;
      if (hasArtwork && picture !== this.picture) {
        this.thumbnail = this.player.artwork;
        this.picture = picture;
      }
      return !!(hasArtwork && this.thumbnail);
    }

    computeIcon() {
      return this.config.icon
        ? this.config.icon
        : this.player.icon || ICON.DEFAULT;
    }

    computeOverflow() {
      const ele = this.shadowRoot.querySelector(".marquee");
      if (ele) {
        const status = ele.clientWidth > ele.parentNode.clientWidth;
        this.overflow =
          status && this.player.active ? 7.5 + ele.clientWidth / 50 : false;
      }
    }

    computeRect(entry) {
      const { left, width } =
        entry.contentRect || entry.getBoundingClientRect();
      this.break = width + left * 2 < BREAKPOINT;
    }

    computeRTL(hass) {
      const lang = hass.language || "en";
      if (hass.translationMetadata.translations[lang]) {
        return hass.translationMetadata.translations[lang].isRTL || false;
      }
      return false;
    }

    toggleGroupList() {
      this.edit = !this.edit;
    }

    fire(type, inDetail, inOptions) {
      const options = inOptions || {};
      const detail =
        inDetail === null || inDetail === undefined ? {} : inDetail;
      const e = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed,
      });
      e.detail = detail;
      this.dispatchEvent(e);
      return e;
    }

    updateIdleStatus() {
      if (this._idleTracker) clearTimeout(this._idleTracker);
      const diff =
        (Date.now() - new Date(this.player.updatedAt).getTime()) / 1000;
      this._idleTracker = setTimeout(() => {
        this.idle = this.player.checkIdleAfter(this.config.idle_view.after);
        this.player.idle = this.idle;
        this._idleTracker = null;
      }, (this.config.idle_view.after * 60 - diff) * 1000);
    }

    getCardSize() {
      return this.config.collapse ? 1 : 2;
    }
  }

  customElements.define("hui-ais-mini-media-player-card", MiniMediaPlayer);
});
