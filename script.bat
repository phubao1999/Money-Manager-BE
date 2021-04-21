SET dbConnection=-e db_connection=value
SET name=-e NAME=value
SET password=-e PASSWORD=value

docker build -t baopt-my-node-app .

docker run -p 3000:3000 baopt-my-node-app %dbConnection% %name% %password%