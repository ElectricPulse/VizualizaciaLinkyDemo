#!/usr/bin/perl

use strict;
use warnings;

my $filename = 'path2.svg';
open my $file, $filename or die "Couldnt not open file $filename: $!";

#Declaring the record seperator to undef so it loads the whole file into a string
$/ = undef;
my $text = <$file>;
close $file;
my $result = " ";

while ($text =~ /<path.*?d="(.*?)".*?\/>/sg) {
	$result = $result . $1 . ", ";
}

print $result



