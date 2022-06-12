# High Level Design Proposal for Continuous Delivery

## Overview

The purpose of this document to gather the specifications / requirements  and outline a
strategy for Continous Delivery (CD) for the open source repo. Having a dependable, automated
CD environment increases confidence to push out quality updates to the extension.

## Goals

1. Identify specifications around environments needed.

1. Identify and make recommendation for automated testing.

1. Versioning and Rollback Strategy.

### Stages / Pipelines

1. There will be different stages and corresponding Market Place extension deployments for each pipline.
1. The various stages will be `PR Validation`, `Release Candidate (RC)` and `General
Availability (GA)`.
1. Each of these stages will deploy an stage-specific extension to the
Market Place identifying them using different Publisher IDs.
1. GA will be the only publicly available extension. Extensions for other
stages - PR Validation & RC will be private.

#### PR Validation

This pipeline is automated on any check-ins into the `Feature` branch and will be used for PR validation. The automated tests, cred scanning and other linters re run at
this statge to ensure that the code is of good quality. The exension will be installed to the `Beta Publisher ID` in the Market Place.

##### PR Workflow

1. Developer creates a `Feature` branch to work on and when they are ready, a Pull Request(PR) is created. The Continous Integration Pipeline is invoked
with linters and automated test runs against the `Feature` Branch.
1. This stage pushes the extension to the Azure Marketplace through Publisher ID `PR-Validation`. The extension is configured with visibility as `Private`
and pricing as `Free`
1. The extension will then with shared with the test `Organization` where the smoke tests will be run to validate that the extension was installed
successfully.
1. The Extension Name will be prefixed with GitHub User alias `<gh-user-name>-Retrospective Tool-PR` so as to allow concurrent runs on the build. There will be a new extension per contributor on the `PR-Validation` Publisher ID. By default, this extension is deleted after the automated tests are run but it can take in a parameter to retain the built for troubleshooting purposes.

#### Release Candidate (RC)

This pipeline will be run against the `Main` branch and internally released to test out any critical problems that may be undetected in the previous cycles. The extension is pubished to the `Release Candiate Publisher ID` in the Market Place.

Automated tests along with the linters and cred scanning are run before the extension is published. The Smoke tests runs in this pipeline will install the extension to a privately shared Azure DevOps Organization and perform basic tests to ensure that the Extension is installed. It is recommended integrate smoke tests and end-to-end integration tests in this stage to identify any potential issues during and after installation of the extension.

##### RC Workflow

1. This pipeline is run before the code is merged to `Main`.
1. This stage pushes the extension to the Azure Marketplace through Publisher ID `RC`. The extension is configured with Visibility as `Private`
and Pricing as `Free`. The Extension Name will be `Retrospective Tool-RC`.
1. The extension will be shared with the test `Organization` where the smoke tests will be run to validate that the extension was installed
successfully.
1. If the contributor wants to troubleshoot the extension deployed, then the contributor needs to submit a request to share their Organization with the Open Source Maintainer.
1. If the pipeline fails to run, the contributor must build with the latest code on the `Main` and their changes; install the extension on their private MarketPlace account.

#### General Availability (GA)

The code on the `Main` branch is bundled as a release to `Production` using this pipeline. This pipeline is manually run by the Open Source Maintainer by creating a [release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository). Also a good read on [automating release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes).

#### GA Workflow

1. Once the RC extension is validated and the Open Source Maintainer(s) is ready to cut a release, they add a Git Tag and trigger a deployment.
1. The extension is deployed to the Azure Marketplace through the Public Publisher ID (that exists today). The extension is deployed with Visibility as `Public` and Pricing as `Free`.
1. The pipeline will run Automated smoke tests against this deployed extension.

### Versioning and Rollback Strategy

Versioning in GitHub can be managed using Git Tag using Actions like [Git-Version](https://github.com/marketplace/actions/git-version).