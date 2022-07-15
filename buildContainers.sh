# get rid of old stuff
docker rmi -f $(docker images | grep "^<none>" | awk "{print $3}")
docker rm $(docker ps -q -f status=exited)

docker kill camelrace
docker rm camelrace

docker build --platform linux/x86_64 -f DockerfileCamel -t maayanlab/camelrace:1.2 .

docker push maayanlab/camelrace:1.2

