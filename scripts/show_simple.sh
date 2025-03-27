#!/bin/bash

echo "Current directory:"
pwd

echo -e "\nDirectories:"
ls -d */

echo -e "\nFiles:"
ls -p | grep -v /