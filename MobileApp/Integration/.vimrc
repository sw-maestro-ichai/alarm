

syntax on
filetype on

set ai
set si
set ts=4
set sw=4

set ru
set nu
set vb
set showmode
set showmatch

set sm
set nobk
set title

set hls
set incsearch
set ic


map <C-X> :q!<cr>
map <F4> :w!<cr>
map <F5> :!gcc -Wall % -o %<<cr>
map <F6> :!./%<<cr>
map <F8> :!g++ -W -Wall -O2 -g % -o %<<cr>

map! () ()<esc>i
map! (); ();<esc>hi
map! [] []<esc>i
map! {} {}<esc>i
map! {}; {};<bs><esc>i<cr><esc>O<bs>
map! <> <><esc>i
map! '' ''<esc>i
map! "" ""<esc>i

set cindent
set autoindent
set smartindent

set nocompatible
set wrap
set magic

set tabstop=4
set shiftwidth=4

set ruler
set backspace=indent,eol,start

set enc=utf-8
set fenc=utf-8
set fencs=utf-8,cp949,cp932,euc-jp,shift-jis,big5,ucs-2le,latin1

set nocompatible 
set hi=1000 
set bs=indent,eol,start 

set lpl
 
filetype plugin on


