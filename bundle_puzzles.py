#!/usr/bin/env python
from os import path
import subprocess


puzzle_ids = ["nyt1952-04-22",
              "eltana-060",
              "eltana-058",
              "nyt1950-11-22",
              "eltana-068",
              "eltana-099",
              "nyt1951-09-23",
              "lat1924-11-27"]

with open('src/Gen/BundledPuzzles.elm', 'w') as elm_file:
    elm_file.write("module Gen.BundledPuzzles exposing (puzzles)\n")

    elm_file.write("puzzles = [")
    elm_file.write(','.join(['puzzle{}'.format(i) for i in range(len(puzzle_ids))]))
    elm_file.write("]\n")

    for i, puzzle_id in enumerate(puzzle_ids):
        xd_dir = path.expanduser('~/Downloads/xd')
        xd_path = subprocess.check_output(['fd', puzzle_id, xd_dir]).strip()
        with open(xd_path) as xd_file:
            data = xd_file.read()
            elm_file.write('''
puzzle{} = """{}"""
            '''.format(i, data))



