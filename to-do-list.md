# Lancement services:

*app 	*-> expo
*back* -> node
*db 	*-> Psql
   	-> Mongo
R-proxy -> nginx

partie docker
 img pour les DB

## to do list :

* [ ] mise en place du service app
* [ ] mise en place du service back
* [ ] mise en place du service db

  * [ ] mongo
  * [ ] postgres
  * [ ] (ORM si c'est un plus)
  * [ ] principe de migration, seed des DB
* [ ] mise en place de Container docker
* [ ] pipeline CI-CD (github actions ?)
* [ ] mise en place de *env* app/back, .....

suite à une discussion avec *Jonathan* et *Vincent Fievez* il a été convenu que peut être mettre en place une api de type graphQL plutôt que REST peut représenter un + .

se renseigner sur *graphQL* et *keycloack* .

graphql : en gros un paradigme d'api qui expose un seul entrypoint plutôt que une série.

keycloak: outil de gestion des token de connexion.

suite à des discussion la mise en place d'un graphQL comme unique entry point plutôt qu'un multiple entrypoint si mis à la place d'una api rest serait plus judicieux. .

## ducoup on résume la partie backend:

on a :

* [ ] graphQL comme entrypoint qui va lui déléguer le reste des recherches vers node
* [ ] node JS (avec express JS) qui va se charger d'interragir entre l'api et les DB
* [ ] un serveur d'identification qui sera en communication entre l'application coté client et le backend à proprement dit , à voir si graphQL ou nodes doit gérer la communication
* [ ] la mise en place d'une DB *~~Structurée~~* pour stocker des volumes de données importants et pas forcément structurés voir le tableau suivant. 

| Caractéristique       | PostgreSQL                                 | MongoDB                                                                          |
| ---------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| Modèle de données    | Relationnel                                | NoSQL (Document)                                                                 |
| Langage de requête    | SQL                                        | Query Language (MongoDB Query Language)                                          |
| Structure des données | Schéma rigide                             | Schéma flexible (chaque objet peut avoir plus ou moins de propriétés uniques) |
| Joins                  | Prise en charge native des jointures       | Support limité, souvent géré côté application                               |
| Transactions           | Prise en charge des transactions ACID      | Pas de transactions ACID, mais des transactions atomiques sur un seul document   |
| Évolutivité          | Scalabilité verticale                     | Scalabilité horizontale                                                        |
| Performances           | Excellentes pour les opérations complexes | Excellentes pour les lectures/écritures massives                                |
| Exemples d'application | Stockage de données utilisateur           | Analyse en temps réel                                                           |

rappel sur les transactions ACID: 

> Les transactions ACID assurent la fiabilité des opérations dans les bases de données relationnelles telles que PostgreSQL. Elles garantissent l'atomicité (opérations indivisibles), la cohérence (intégrité des données), l'isolation (transactions indépendantes) et la durabilité (persistance des modifications). Ces propriétés sont cruciales pour maintenir la fiabilité et la cohérence des données dans les environnements critiques comme les systèmes bancaires et de gestion des stocks.

## un point sur le docker

l'ensemble des services internes au backend seront dockerisés individuellement afin d'avoir une meilleure

donc par docker on aura 

### le coeur node/graphql/express

[graphQL inside a node js ](https://www.tutorialspoint.com/graphql/graphql_tutorial.pdf)

[express](https://lcc.lt/assets/pdf_files/express-handbook.pdf)

### le serveur d'identification keycloak

[doc officielle ](https://www.keycloak.org/documentation)

### la db mongo+ mongoose

[mongo mongoose](https://www.rose-hulman.edu/class/csse/csse490WebServicesDev/201620/Slides/MongoDBAndMongoose.pdf)

### la db postrgres + sequelize

[sequelize dans node js ](https://peppel-g.github.io/course-material/lectures/using-sequelize-in-node-js/using-sequelize-in-node-js.pdf)

[doc de sequelize](https://sequelize.org/)


### note sur docker swarm

[docker swarm doc](https://buildmedia.readthedocs.org/media/pdf/dccn-docker-swarm/latest/dccn-docker-swarm.pdf)

>
> Docker Swarm est une plateforme de gestion de conteneurs Docker qui permet de déployer, de gérer et de mettre à l'échelle des applications conteneurisées sur un cluster de machines. Voici quelques points clés sur Docker Swarm :
>
> 1. **Orchestration des conteneurs** : Docker Swarm permet de déployer et de gérer un ensemble de conteneurs Docker sur un cluster de machines. Il simplifie la gestion des conteneurs en automatisant des tâches telles que le déploiement, la mise à l'échelle, la gestion des services et la récupération en cas de panne.
> 2. **Architecture simple** : L'architecture de Docker Swarm est relativement simple. Elle comprend un nœud manager (manager node) qui coordonne les opérations du cluster, ainsi que des nœuds de travail (worker nodes) où les conteneurs sont exécutés. Les nœuds manager et de travail peuvent être répartis sur plusieurs machines physiques ou virtuelles.
> 3. **Évolutivité** : Docker Swarm permet de mettre à l'échelle les services et les applications de manière transparente. Vous pouvez ajouter ou supprimer des nœuds de travail au cluster pour répondre aux besoins de charge de travail croissants ou décroissants.
> 4. **Gestion des services** : Docker Swarm utilise des concepts de service pour déployer et gérer des applications conteneurisées. Un service définit un ensemble de conteneurs qui exécutent la même application, et Docker Swarm assure la répartition de la charge et la gestion des ressources pour ces services.
> 5. **Sécurité** : Docker Swarm offre des fonctionnalités de sécurité intégrées, telles que la gestion des secrets pour protéger les informations sensibles telles que les clés d'API et les informations d'identification.
> 6. **Intégration avec Docker CLI** : Docker Swarm peut être entièrement contrôlé à l'aide de la Docker CLI (interface de ligne de commande), ce qui facilite la gestion et l'administration du cluster.
>
> En résumé, Docker Swarm est une solution d'orchestration de conteneurs Docker qui permet de simplifier le déploiement et la gestion des applications conteneurisées sur un cluster de machines, offrant ainsi une solution évolutive, robuste et sécurisée pour les environnements de production.
