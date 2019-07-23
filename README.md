# POP REST Store - eCommerce REST API and Web App

[![license](http://img.shields.io/badge/license-CC0%201.0%20Universal-blue.svg)](https://github.com/moqui/PopRestStore/blob/master/LICENSE.md)
[![release](http://img.shields.io/github/release/moqui/PopRestStore.svg)](https://github.com/moqui/PopRestStore/releases)
[![commits since release](http://img.shields.io/github/commits-since/moqui/PopRestStore/v1.0.0.svg)](https://github.com/moqui/PopRestStore/commits/master)

POP REST Store is a REST API for eCommerce and an in-browser eCommerce application built with Vue JS. For search engine 
compatibility and other reasons the catalog browsing and content pages are server rendered while the profile, checkout, and other
user specific pages are client rendered in a Vue JS single-page app.

This component is does not contain an admin application, for that use the POP Commerce ERP app. There is sample configuration data
in the XML data files in this component. Most configuration is associated with a (Product) Store for multi-store support with 
different settings from product categories to use to full support for overriding all server and client rendered templates.

To customize this ecommerce application the recommended approach is to include the component but not modify it. XML Screens in this
component can be included and/or overridden in the component for your ecommerce app without duplicating or modifying files. You can
also fork and modify this git repository but for significant changes that takes more effort to maintain and upgrade over time.

To add this component to Moqui the easiest approach is to use the Gradle get component task:

    $ ./gradlew getComponent -Pcomponent=PopRestStore

Or add a dependency in your component.xml file like:

    <depends-on name="PopRestStore"/>
