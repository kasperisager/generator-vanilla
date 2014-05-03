# <%= name %><% if (desc) { %>

<%= desc %><% } %>

---
Copyright &copy; <%= year %> <%= (author.url) ? '[' + author.name + '](' + author.url + ')' : author.name %>.<% if (license !== 'Proprietary') { %> Licensed under the terms of the [<%= license %> License](LICENSE.md).<% } %>
