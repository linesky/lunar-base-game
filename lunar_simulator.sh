echo write enter to continue write start to restart
while read a
do
	echo $a > out.txt
	netcat $1 $2 < out.txt
	echo " "
done
