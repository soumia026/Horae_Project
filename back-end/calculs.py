def calculerHeuresSup(nbrHeuresCours,nbrHeuresTd,nbrHeuresTp):
    transNbrHeuresCours = nbrHeuresCours * 1.5
    transNbrHeuresTD = nbrHeuresTd
    transNbrHeuresTp = nbrHeuresTp * 0.75
    nbrHeuresCharge = 9
    nbrHeuresSup = 0
    calculCharge = 0
    calculCharge += transNbrHeuresCours
    if calculCharge >= 9 :
        nbrHeuresSupCours = (transNbrHeuresCours - 9)/1.5
        nbrHeuresSup += nbrHeuresSupCours + nbrHeuresTd + nbrHeuresTp
    else :
        nbrChargeRest = 9 - calculCharge
        calculCharge += transNbrHeuresTD
        if calculCharge >= 9 :
            nbrHeuresSupTd = transNbrHeuresTD - nbrChargeRest
            nbrHeuresSup += nbrHeuresSupTd + nbrHeuresTp
        else :
            nbrChargeRest = 9 - calculCharge
            calculCharge += transNbrHeuresTp
            nbrHeuresSupTp = (transNbrHeuresTp - nbrChargeRest)/0.75
            if calculCharge <= 9 :
                nbrHeuresSup = 0
            else :
                nbrHeuresSup += nbrHeuresSupTp


    return nbrHeuresSup

print(calculerHeuresSup(6,0,0)) #0
print(calculerHeuresSup(0,9,0)) #0
print(calculerHeuresSup(0,0,12)) #0
print(calculerHeuresSup(0,0,14)) #2
print(calculerHeuresSup(0,11,0)) #2
print(calculerHeuresSup(8,0,0)) #2
print(calculerHeuresSup(6,2,0)) #2
print(calculerHeuresSup(6,2,2)) #4
print(calculerHeuresSup(8,0,0)) #2
print(calculerHeuresSup(8,2,2)) #6
print(calculerHeuresSup(4,0,0)) #0
print(calculerHeuresSup(4,2,0)) #0
print(calculerHeuresSup(4,4,0)) #1
print(calculerHeuresSup(4,4,3)) #4
print(calculerHeuresSup(4,0,0)) #0
print(calculerHeuresSup(4,0,4)) #0
print(calculerHeuresSup(4,0,8)) #4
print(calculerHeuresSup(2,3,4)) #0
print(calculerHeuresSup(2,3,7)) #3


   
