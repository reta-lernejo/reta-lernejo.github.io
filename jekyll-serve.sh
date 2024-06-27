#!/bin/bash

echo "Tiu skripto servas la retpaĝojn loke uzante jekyll - simile kiel tio okazas en la publika paĝo"
echo "Ĉiu konservita paĝo tiam tuj konvertiĝas kaj estas spektebla en retumilo ĉe http://0.0.0.0:4000"
echo ""
echo "Unue necesas instali pakaĵojn laŭ la enhavo en Gemfile kaj antaŭe certigu aktualigitan"
echo "sistemon:"
echo "# sudo gem update --system"
echo "# bundle install [--local]"
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"

# vd pri gem github-pages
# https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll

# vd. eblaj pri problomoj kun bundler-versio:
# https://bundler.io/blog/2019/05/14/solutions-for-cant-find-gem-bundler-with-executable-bundle.html
# https://stackoverflow.com/questions/51035335/appengine-flexible-ruby-environment-application-startup-error-usr-bin-env-r
# kontrolu ankaŭ ĉu ruby kaj bundler estas koheraj (ekz-e per komando which)
# ĉe mi foje helpis forigi loke instalitan malnovan bundler per
# sudo rm /usr/local/bin/bundle
# sudo rm /usr/bin/bundle
# sudo ln -s /usr/bin/bundler2.7 /usr/bin/bundle
#
# alternative forigu ruby+bundle(r) de via sistemo kaj
# instalu tutaktualajn eldonojn mane:...

# pri eblaj problemoj kun Ruby, rvm:
# https://rvm.io/support/faq

# Jen la kompleta komando por uzo de 'bundle', vi povas aldoni argumenton --trace se vi vokas la skripton
bundle exec jekyll serve --watch --force_polling --host 0.0.0.0 $@

# Se vi alie instalas ĉiujn bezonatajn pakaĵojn eventuale funkcias ankaŭ simpla:
# jekyll serve --trace


