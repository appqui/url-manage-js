Url Manage - API that helps to change url in jQuery chain style.

```
http://www.google.com'.url()
      .attr('port', '80')
      .param('search', 'js')
      .string() == 'http://www.google.com:80?search=js
```
