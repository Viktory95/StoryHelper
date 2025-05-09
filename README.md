# StoryHelper
### Run cassandra and kafka in docker:
docker-compose -f docker/docker-compose.yml up
### Go to terminal and in cassandra db console and create namespaces:
docker exec -it docker-cassandra-1 bash
cqlsh

--creation space with name story_helper_auth:
CREATE  KEYSPACE IF NOT EXISTS story_helper_auth
WITH REPLICATION = {'class': 'SimpleStrategy',
'replication_factor' : 1};

--creation space with name story_helper:
CREATE  KEYSPACE IF NOT EXISTS story_helper
WITH REPLICATION = {'class': 'SimpleStrategy',
'replication_factor' : 1};

--creation space with name story_helper_log:
CREATE  KEYSPACE IF NOT EXISTS story_helper_log
WITH REPLICATION = {'class': 'SimpleStrategy',
'replication_factor' : 1};
