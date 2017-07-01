Este es el proyecto de correos dinamicos que se esta realizando para la plataforma Ufind. Desarrollada como una MEAN app.

1.- Por ahora ya es posible enviar diferentes correos a diferentes fechas especificas, solo que el contenido de cada uno de
estos correos tiene que ser modificada vía codigo fuente, en donde se puede colocar codigo html para el diseño de este. Vease
dentro de la carpeta "routes", en el archivo users.js

2.- Para el envio de correo se esta utilizando un servicio de sendgrid, este requiere un nombre de usuario y contraseña. Se esta
proporcionando el usuario y contraseña de quien desarrollo la aplicación y se encuentra dentro de la carpeta "config" en el
archivo sendgrid.js