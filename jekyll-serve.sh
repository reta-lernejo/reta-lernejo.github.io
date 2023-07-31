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

# pri eblaj problemoj kun Ruby, rvm:
# https://rvm.io/support/faq

# Jen la kompleta komando por uzo de 'bundle', vi povas aldoni argumenton --trace se vi vokas la skripton
bundle exec jekyll serve --watch --force_polling --host 0.0.0.0 $@

# Se vi alie instalas ĉiujn bezonatajn pakaĵojn eventuale funkcias ankaŭ simpla:
# jekyll serve --trace


