#!/bin/bash
system=$1
component=$2
mkdir -p src/$system/implementations/$component
touch src/$system/implementations/$component/$component.ts
touch src/$system/implementations/$component/$component.test.ts
touch src/$system/implementations/$component/types.ts
touch src/$system/implementations/$component/errors.ts

