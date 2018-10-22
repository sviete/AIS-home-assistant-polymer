from setuptools import setup, find_packages

setup(name='ais-dom-frontend',
      version='20181014.0',
      description='The AIS dom frontend',
      url='https://github.com/sviete/AIS-home-assistant-polymer',
      author='Amdrzej Raczkowski based on Home Assistant Polymer',
      author_email='info@sviete.pl',
      license='Apache License 2.0',
      packages=find_packages(include=[
          'hass_frontend',
          'hass_frontend_es5',
          'hass_frontend.*',
          'hass_frontend_es5.*'
      ]),
      install_requires=[
          'user-agents==1.1.0',
      ],
      include_package_data=True,
      zip_safe=False)
