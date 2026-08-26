# Turbo

Turbo is een webapplicatie waarmee gebruikers hun rijervaring kunnen bijhouden tijdens het oefenen voor het rijbewijs B. Gebruikers kunnen hun rijperiode opvolgen, gereden trajecten registreren en hun rijgegevens beheren vanuit één dashboard.

## Functionaliteiten

* Registreren en inloggen
* Uitloggen
* Gebruikersprofiel bekijken en beheren
* Datum van het voorlopig rijbewijs opslaan
* Rijperiode van 9 maanden opvolgen
* Totaal aantal gereden kilometers bijhouden
* Aantal gereden trajecten bijhouden
* Recente trajecten weergeven op het dashboard
* Nieuwe rijtrajecten toevoegen
* Bestaande trajecten bewerken
* Trajecten verwijderen
* Verkeersomstandigheden per traject registreren
* Opmerkingen van de begeleider opslaan
* Gebruikersgegevens en trajecten afschermen per account

## Technologieën

* **Next.js 16**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **NextAuth**
* **Prisma ORM**
* **MySQL**
* **bcryptjs**
* **Git & GitHub**

## Projectstructuur

```text
src/
├── app/
│   ├── actions/
│   │   ├── auth.ts
│   │   └── trajecten.ts
│   │
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │
│   ├── dashboard/
│   ├── profiel/
│   ├── trajecten/
│   │   ├── nieuw/
│   │   └── [id]/
│   │       └── bewerken/
│   │
│   └── page.tsx
│
├── components/
│
└── lib/
    └── prisma.ts
```

## Installatie

### Vereisten

Voor het uitvoeren van Turbo zijn de volgende onderdelen nodig:

* Node.js
* npm
* MySQL
* Een geconfigureerde `.env` file

### Repository clonen

```bash
git clone <repository-url>
cd turbo
```

### Dependencies installeren

```bash
npm install
```

### Database configureren

Configureer de databasegegevens in `.env`.

De applicatie gebruikt Prisma als ORM voor de communicatie met MySQL.

Na het configureren van de database kan het Prisma-schema worden toegepast met:

```bash
npx prisma generate
npx prisma db push
```

### Applicatie starten

Start de development server:

```bash
npm run dev
```

De applicatie is vervolgens beschikbaar via:

```text
http://localhost:3000
```

## Authenticatie

Turbo gebruikt NextAuth voor de authenticatie van gebruikers.

Wachtwoorden worden vóór opslag gehasht met bcrypt. Gebruikers kunnen alleen hun eigen gegevens en rijtrajecten bekijken en beheren.

Beschermde pagina's controleren of er een actieve sessie aanwezig is. Niet-ingelogde gebruikers worden doorgestuurd naar de startpagina.

## Rijtrajecten

Een traject bevat onder andere:

* Startlocatie
* Starttijd
* Eindlocatie
* Eindtijd
* Afstand in kilometer
* Verkeersomstandigheden
* Opmerking van de begeleider

Trajecten kunnen worden:

1. Toegevoegd
2. Bekeken
3. Bewerkt
4. Verwijderd

Bij het toevoegen of bewerken worden de ingevoerde gegevens gevalideerd. Zo moet de eindtijd bijvoorbeeld na de starttijd liggen en moet de kilometerafstand geldig zijn.

## Dashboard

Het dashboard geeft een overzicht van de belangrijkste rijgegevens:

* Gereden kilometers
* Voortgang richting 1500 km
* Rijperiode richting het minimum van 9 maanden
* Aantal opgeslagen trajecten
* De vijf meest recente trajecten

De rijperiode wordt berekend op basis van de datum waarop het voorlopig rijbewijs werd geregistreerd.

## Beveiliging

Turbo controleert bij databasebewerkingen steeds de gebruiker die momenteel is ingelogd.

Hierdoor kan een gebruiker niet zomaar trajecten van een andere gebruiker bekijken, wijzigen of verwijderen.

Bijvoorbeeld bij het bewerken van een traject wordt niet alleen het traject-ID gecontroleerd, maar ook het `userId` van de ingelogde gebruiker.

## Validatie

De applicatie controleert onder andere:

* Verplichte velden
* Geldige emailadressen
* Minimale wachtwoordlengte
* Dubbele emailadressen
* Geldige kilometerafstand
* Geldige verkeersomstandigheden
* Geldige start- en eindtijd
* Eindtijd na starttijd
* Geldige gebruiker bij databasebewerkingen

## Testing

De volledige applicatie werd handmatig getest vanaf een nieuwe gebruikersaccount.

De volgende onderdelen werden gecontroleerd:

* Registratie
* Login
* Logout
* Profiel
* Dashboard
* Rijperiode
* Traject toevoegen
* Traject bekijken
* Traject bewerken
* Traject verwijderen
* Validatie
* Gebruikersisolatie
* Databasebewerkingen
* Navigatie
* Production build

De production build werd succesvol uitgevoerd met:

```bash
npm run build
```

## Git

Het project wordt beheerd met Git en opgeslagen op GitHub.

Tijdens de ontwikkeling werd gewerkt met aparte commits voor verschillende functionaliteiten en bugfixes. Hierdoor is de ontwikkeling van het project doorheen de tijd traceerbaar.

## Projectstatus

Het project is functioneel afgerond.

De belangrijkste functionaliteiten zijn geïmplementeerd en de volledige applicatie werd getest. De production build verloopt succesvol.

## Auteur

**Turbo**

Bachelor Toegepaste Informatica
