module SamplePuzzle exposing (id, puzzle)

import Data.Puzzle.Id as PuzzleId exposing (PuzzleId)


id : PuzzleId
id =
    PuzzleId.fromString "sample"


puzzle : String
puzzle =
    """Title: New York Times, Thursday, January 12, 1961
Author: Unknown
Editor: Margaret Farrar
Date: 1961-01-12


RIPS#JOURS#FLEW
OXEN#EASEL#LEDA
AIRE#TRAVOLATOR
RACERS##EPITOME
##OZO#HERES####
TELETHONS#LAPAZ
OLA#EAST#HELENA
METE#VERGE#PRIX
EMERGE#EARS#FOE
SEDGE#MARATHONS
####CRATE#IOR##
ALASKAN##ARMADA
SYNCOPATOR#ATOP
IONA#INAIR#GENS
ANON#DAILY#EDGE


A1. Saws (wood) along the grain. ~ RIPS
A5. Tous les ___ (every day): Fr. ~ JOURS
A10. Went swiftly. ~ FLEW
A14. Farm animals. ~ OXEN
A15. Picture support. ~ EASEL
A16. Mother of Helen of Troy. ~ LEDA
A17. River in Yorkshire. ~ AIRE
A18. London subway's moving sidewalk. ~ TRAVOLATOR
A20. American black snakes. ~ RACERS
A22. Compendium. ~ EPITOME
A23. Combining form for a blue gas. ~ OZO
A24. Start of a toast. ~ HERES
A26. Endurance broadcasts. ~ TELETHONS
A29. One of Bolivia's capitals. ~ LAPAZ
A34. Wave: Span. ~ OLA
A35. Compass point. ~ EAST
A36. Capital of Montana. ~ HELENA
A37. Measure out. ~ METE
A39. Margin. ~ VERGE
A41. ___ Goncourt, literary award. ~ PRIX
A42. Come forth. ~ EMERGE
A44. Auricles. ~ EARS
A46. Antagonist. ~ FOE
A47. Marsh plant. ~ SEDGE
A48. Olympics events. ~ MARATHONS
A50. Container. ~ CRATE
A52. Suffix forming a comparative ending. ~ IOR
A53. Native of Nome. ~ ALASKAN
A57. Fleet of military planes. ~ ARMADA
A60. Jazz addict. ~ SYNCOPATOR
A63. At the summit. ~ ATOP
A64. Hebrides island. ~ IONA
A65. "Bombs bursting ___ . . . " ~ INAIR
A66. Army men: Abbr. ~ GENS
A67. Presently. ~ ANON
A68. Type of newspaper. ~ DAILY
A69. Sharpness. ~ EDGE

D1. Loud, rumbling sound. ~ ROAR
D2. South African iris. ~ IXIA
D3. Filtered. ~ PERCOLATED
D4. Nasal sound. ~ SNEEZE
D5. Planes. ~ JETS
D6. Sweep. ~ OAR
D7. Army monogram. ~ USA
D8. Lapels. ~ REVERS
D9. Hillside. ~ SLOPE
D10. Level. ~ FLAT
D11. Mother of Apollo. ~ LETO
D12. Name given to Esau. ~ EDOM
D13. Old-time word of caution. ~ WARE
D19. Linen or cotton thread. ~ LISLE
D21. Repetition. ~ ROTE
D24. Socks. ~ HOSE
D25. Beseech. ~ ENTREAT
D26. Weighty volumes. ~ TOMES
D27. Smyrna fig. ~ ELEME
D28. Engage in. ~ HAVE
D30. High peak. ~ ALP
D31. Punctured. ~ PERFORATED
D32. Negatively charged atom. ~ ANION
D33. Slate axes. ~ ZAXES
D36. Queen of Olympus. ~ HERA
D38. Unit of physical energy. ~ ERG
D40. Depot: Fr. ~ GARE
D43. Small lizard. ~ GECKO
D45. Set in motion. ~ STIR
D48. Tomorrow: Span. ~ MANANA
D49. Deference. ~ HOMAGE
D51. Done with speed. ~ RAPID
D53. Global area. ~ ASIA
D54. French city on the Rhone. ~ LYON
D55. Part of A.D. ~ ANNO
D56. Scrutinize. ~ SCAN
D57. 'Arriet's friend. ~ ARRY
D58. Bell sound. ~ DONG
D59. Vaulted part of a church. ~ APSE
D61. Indo-Chinese. ~ TAI
D62. Fuel. ~ OIL

"""
