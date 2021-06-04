# get rid of old stuff
docker rmi -f $(docker images | grep "^<none>" | awk "{print $3}")
docker rm $(docker ps -q -f status=exited)

docker kill camelrace
docker rm camelrace

docker build -f DockerfileCamel -t maayanlab/camelrace .

docker push maayanlab/camelrace

