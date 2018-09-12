'use strict';

const Hapi = require("hapi");

const server = Hapi.server({
    host: "localhost",
    port: 8000
});

server.route({
    method: "GET",
    path: "/api",
    handler: (request, h) => {
        return "{'text': 'foo'}";
    }
})

server.route({
    method: "GET",
    path: '/',
    handler: (request, h) => {
        return h.file("./public/index.html");
    }
})

const init =  async () => {
    await server.register(require('inert'));

    server.route({
      method: "GET",
      path: "/{param*}",
      handler: {
           directory: {
               path: "public",
               index: ['index.html', 'default.html']
           }
       }
    })

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (error) => {
    console.log(error);
    process.exit(1);
})

init();
