#!/bin/bash

echo "Enter the filename"
read file_svg

if [ ! -f $file_svg ]; then
	echo "Invalid file"
	exit
fi

file_bmp=${file_svg/.svg/.png}

inkscape --export-filename=file_bmp $file_svg
potrace -b svg -o $file_svg $file_bmp
inkscape --export-plain-svg --export-filename="wow-$file_svg" $file_svg

mv $file_bmp ~/Trash
