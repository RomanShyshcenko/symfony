#!/usr/bin/env bash

if [ "$1" == "" ]; then
    echo "No command passed!" >> /var/www/html/var/log/cron-www.log 2>&1
else
  for cmd in "$@"
  do
      output=$(echo "++++++++++++++++++++ "`date "+%Y-%m-%d_%H-%M-%S"`": executing command "$cmd" ++++++++++++++++++++"$'\n')
      output2=$(/usr/local/bin/php /var/www/html/bin/console $cmd 2>&1)
      output3=$(echo $'\n'"-------------------- command "$cmd" finished --------------------"$'\n')
      res="$output""$output2""$output3"
      echo "$res" >> /var/www/html/var/log/cron-www.log
  done
fi
