SET dbConnection=--build-arg db_connection=db_connection
SET name=--build-arg NAME=NAME
SET password=--build-arg PASSWORD=PASSWORD

docker build -t baopt-my-node-app . %dbConnection% %name% %password%

docker run -p 3000:3000 baopt-my-node-app