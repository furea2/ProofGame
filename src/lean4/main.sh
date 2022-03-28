
file=src/sample.lean

lean ${file} | while read line
do
    # echo "---------------------------"
    # echo "${line}"
    IFS=':' read -ra line_array <<< "$line"
    # line_array=(${line//:/ })
    # for ip in "${line_array[@]}"
    # do
    #     echo "$ip"
    # done
    fn=${line_array[0]}
    row=${line_array[1]}
    col=${line_array[2]}
    status=`echo ${line_array[3]} | echo -e $(cat)`
    message=`echo ${line_array[4]} | echo -e $(cat)`

done


