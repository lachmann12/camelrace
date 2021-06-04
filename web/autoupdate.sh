#!/bin/bash
export PATH=~/.local/bin:$PATH
echo -e "\nPATH=~/.local/bin:$PATH" >> /etc/profile
/etc/init.d/apache2 start

echo -e "$dbserver" >> /app/camelrace/test.txt

while [ 1 ]; do
    sleep 10s
done