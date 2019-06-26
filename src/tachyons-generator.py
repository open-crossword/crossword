import requests
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
from collections import defaultdict

foo = requests.get('http://tachyons.io/docs/table-of-styles/')

soup = BeautifulSoup(foo.text, 'html.parser')

elm_output = ""


def kebab_to_camel(string):
    return ''.join([s.capitalize() for s in string.split('-')])

psudo_classes = set()

# need to store the things that are going into Css.batch for each class
class_dict = defaultdict(list)

# [u'MozFocusInner', u'after', u'focus', u'hover', u'link', u'nthChild(odd)', u'active', u'visited', u'before']

for tr in soup.find_all("tr"):
    tds = tr.find_all("td")
    if len(tds) < 2:
        continue

    classes = tds[0]
    styles = tds[1]

    for selector in classes.text.split(','):
        selector = selector.strip('.').strip()
        for css_class in selector.split():
            css_class = kebab_to_camel(css_class)

            pseudo_class = None
            pseudo_element = None

            if '::' in css_class:
                css_class, pseudo_element = css_class.split('::')

            if ':' in css_class:
                css_class, pseudo_class = css_class.split(':')

            if pseudo_class:
                class_dict[css_class].append(('p_cl', pseudo_class, styles.text))

            if pseudo_element:
                class_dict[css_class].append(('p_el', pseudo_element, styles.text))



"""
glow =
   Css.batch
     [
         Css.property "transition" "opacity .15s ease-in"
       , Css.psudoClass
     ]

"""
