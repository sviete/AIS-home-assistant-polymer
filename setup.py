from setuptools import setup, find_packages

setup(name='ais-dom-frontend',
      version='20180622.1',
      description='AIS dom frontend',
      url='https://github.com/sviete/home-assistant/home-assistant-polymer',
      author='Andrzej Raczkowski',
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
