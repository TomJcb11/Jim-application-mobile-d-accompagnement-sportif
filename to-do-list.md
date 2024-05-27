# Lancement services:

*app 	*-> expo
*back* -> node
*db 	*-> Psql
   	-> Mongo
R-proxy -> nginx

partie docker
 img pour les DB

## to do list : (plus à jour voir le fichier todo) 

je laisse pour la chronologie mais en soi ca n'a plus bcp de sens mtn 

* [ ] mise en place du service app
* [ ] mise en place du service back
* [X] mise en place du service db

  * [ ] ~~mongo~~
  * [X] postgres
  * [X] (ORM si c'est un plus)
  * [X] principe de migration, seed des DB
* [ ] mise en place de Container docker
* [ ] ~~pipeline CI-CD (github actions ?)~~
* [X] mise en place de *env* app/back, .....

**suite à une discussion avec *Jonathan* et *Vincent Fievez* il a été convenu que peut être mettre en place une api de type graphQL plutôt que REST peut représenter un + .**

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



## note du 22/04 sur l'état actuel de jim

* [X] Abandon de la base de données mongo
  Plus vraiment de sens d'avoir une db en plus , à la place on stocke les données "flexibles" sous forme de **json** dans PostgresQL

### Etat des différents Services 

* [X] Node + express  sous TypeScript
* [X] Prisma comme ORM de PostgresQL avec la mise en place de migration et de seed
* [ ] GraphQL comme entrypoint api avec Apollo pour la communication entre l'application et le coté "back"
* [ ] Redis comme outil de caching
* [ ] RabbitMQ comme outil de messagerie asynchrone (système de file d'attente de tâches)
* [ ] service back en docker
* [ ] communication point-to-point app/back

### Aparte théorique sur les services redis et rabbitmq

> Copilot explication simple de RabbitMQ
>
> D'accord, je vais essayer de simplifier.
>
> Imaginez que vous ayez une entreprise de livraison de colis. Vous avez beaucoup de commandes (messages) qui arrivent en même temps et vous avez plusieurs livreurs (consommateurs) pour les livrer.
>
> **RabbitMQ** est comme le centre de tri de votre entreprise. Lorsqu'une commande arrive, elle est envoyée au centre de tri (RabbitMQ). Le centre de tri organise et stocke les commandes jusqu'à ce qu'un livreur soit prêt à les prendre.
>
> Si un livreur est disponible, il prend une commande du centre de tri et la livre. Si tous les livreurs sont occupés, le centre de tri continue de stocker les commandes jusqu'à ce qu'un livreur soit libre.
>
> C'est un moyen efficace de gérer un grand nombre de commandes et de s'assurer qu'elles sont toutes traitées, même si elles arrivent toutes en même temps.
>
> De plus, si une commande est très importante et doit être livrée en priorité, le centre de tri peut la mettre en haut de la pile. C'est ce qu'on appelle la "priorité des messages" dans RabbitMQ.
>
> En résumé, RabbitMQ est un système qui aide à gérer et à distribuer efficacement les "messages" (ou tâches) dans un système informatique.



> Copilot explication simple de Redis
>
> D'accord, je vais expliquer Redis de manière plus simple et moins technique.
>
> Imaginez que vous ayez une bibliothèque avec des milliers de livres. Chaque fois que vous voulez un livre, vous devez parcourir toute la bibliothèque pour le trouver, ce qui peut prendre beaucoup de temps.
>
> Maintenant, imaginez que vous ayez une petite étagère à côté de vous où vous pouvez garder les livres que vous utilisez le plus souvent. Au lieu de parcourir toute la bibliothèque chaque fois que vous voulez un de ces livres, vous pouvez simplement le prendre sur l'étagère. C'est beaucoup plus rapide.
>
> **Redis** est comme cette petite étagère. Il garde les données que vous utilisez le plus souvent en "mémoire", ce qui signifie qu'il peut les récupérer très rapidement. C'est comme une version super rapide de votre base de données principale.
>
> De plus, tout comme vous pouvez garder différents types de choses sur votre étagère (livres, magazines, DVD, etc.), Redis peut stocker différents types de données (chaînes, listes, ensembles, etc.).
>
> En résumé, Redis est un système qui aide à rendre les opérations de données plus rapides en stockant les données fréquemment utilisées en mémoire pour un accès rapide.
