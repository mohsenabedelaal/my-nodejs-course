# Express Server TODO App

Express is a Fast, unopinionated, minimalist web framework for node.

# Tips through the course

EJS snippets:

- Inside a ejs file (html before) you can use the <% const x = "string or any variable" %> to create a variable
  inside your file
  to display this constant use this : <%= x %>
  You can also pass vairable from your app file through the render res.render('filename',{'title':"passed variable"})
  and recieve it in the file.

- Partials template are files that contain common used tags in a ejs file (html) like : header or navbar or footer ...,
  so these can be created in a file and inserted in the needed files .

# What is Mongodb

- It is a NoSQL database schemaless and uses JSON-like documents with optional schema , in other words **it is a document database with the scalability and flexibility that you want with the querying and indexing that you need**.
