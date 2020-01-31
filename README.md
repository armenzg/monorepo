# Monorepo example project

This project attempts to serve as an example of various micro-services and SPAs deployed from the same repository.

## Principles

An attempt will be made for every service and SPA to be deployed to be centralized into their own directory.

An attempt will be made to only trigger deployments and tests for what actually changes. If only service 1 is change we should only deploy service 1 and its associated tests. Nothing else.

## Third party services

This project will deploy backend services via Heroku and frontend SPAs via Netlify. Tests will be executed via Travis.

Potentially other substitute services might be tried for each service/SPA but it is not planned at the moment.

## Third party tools

Initially services will be using Django and SPAs will be using ReactJs/Neutrino.

## Upsides

Using independent services and SPAs makes each one easier to comprehend (reduced mental model), independent & reduced dependencies (smaller bundles and faster deployment), clear separation of responsibilities and indepent decisions that fits team needs.

Each service/SPA can defined support for different tooling and integrations with IDEs.

## Downsides

Having multiple services/SPAs requires granting write permissions to all the code and not being able to restrict a set of persons to one service.

There's some overhead that needs to be repeated across projects. For instance:

* Setting up log drains
* Setting up frontend error reporting
