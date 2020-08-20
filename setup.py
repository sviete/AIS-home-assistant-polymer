from setuptools import setup, find_packages

setup(
    name="ais-dom-frontend",
    version="20200811.3",
    description="AIS dom frontend",
    url="https://github.com/sviete/home-assistant/home-assistant-polymer",
    author="The Authors of the AI-Speaker.com project.",
    author_email="info@sviete.pl",
    license="Apache License 2.0",
    packages=find_packages(include=["hass_frontend", "hass_frontend.*"]),
    include_package_data=True,
    zip_safe=False,
)
