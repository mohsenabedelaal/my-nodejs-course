# What is NodeJS

- Nodejs is a **runtime environment** for executing JavaScript Code.

- Nodejs to create **backend services** (API).

- Nodejs is used for **highly-scalable,superfast,data-intensive and real-time apps** (chat apps , ...)
  used in Paypal app

- Cleaner and more consistent codebase to use it as a frontend and a backend ,since you are using JavaScript.

- Since JavaScript is just executed inside a browser and converted to a machine language with specific browser engine (V8 for googlechrom,...)this engine is embedded inside a Node.exe to be executed outside the browser.(like fs.readFile and http.createServer ...)
  ps: NODE is not a framework it is a runtime environment.

# How Node Works

-Nodejs are highly scalable due to the **non-blocking asynchronous nature**
(ex: when you are in a restaurant a waiter comes to your table and service your table ,and then send it to the kitchen ,and then service another table and so one ).
**In the architect worlds a single thread can handle multi-request.**
ps :Like ASP.net other some frameworks works in synchronous architect which make them unsalable.(but you can make the asp.net async but need extra work.)

This makes node an ideal tool for I/O-intensive apps that have a lot of requests.But node is not used for CPU-intensive apps (like apps requires calculations , and videos ...)
