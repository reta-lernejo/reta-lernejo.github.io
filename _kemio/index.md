---
layout: home
title: Kemio
---

<!-- alternativa nomo elementoj & molekuloj -->

<style>
    table td {
        border: none !important;
    }
    table tr {
        background-color: inherit !important;
    }
</style>

{% assign kem = site.kemio | sort: "chapter" %}
{% for t in kem %}{% if t.title and t.chapter %}
| **{{ t.chapter}}** | [{{ t.title | escape }}]({{ t.url | relative_url }}) |{% endif %}{% endfor %}

