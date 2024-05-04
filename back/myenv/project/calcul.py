def calculerHeuresSup(nbrHeuresCharge,nbrHeuresCours,nbrHeuresTd,nbrHeuresTp,TauxCours,TauxTd,TauxTp):
    transNbrHeuresCours = nbrHeuresCours * TauxCours
    transNbrHeuresTD = nbrHeuresTd * TauxTd
    transNbrHeuresTp = nbrHeuresTp *TauxTp
    nbrHeuresSup = 0
    calculCharge = 0
    calculCharge += transNbrHeuresCours
    if calculCharge >= nbrHeuresCharge :
        nbrHeuresSupCours = (transNbrHeuresCours - nbrHeuresCharge)/TauxCours
        nbrHeuresSup += nbrHeuresSupCours + nbrHeuresTd + nbrHeuresTp
    else :
        nbrChargeRest = nbrHeuresCharge - calculCharge
        calculCharge += transNbrHeuresTD
        if calculCharge >= nbrHeuresCharge :
            nbrHeuresSupTd = (transNbrHeuresTD - nbrChargeRest)/TauxTd
            nbrHeuresSup += nbrHeuresSupTd + nbrHeuresTp
        else :
            nbrChargeRest = nbrHeuresCharge - calculCharge
            calculCharge += transNbrHeuresTp
            nbrHeuresSupTp = (transNbrHeuresTp - nbrChargeRest)/TauxTp
            if calculCharge <= nbrHeuresCharge :
                nbrHeuresSup = 0
            else :
                nbrHeuresSup += nbrHeuresSupTp


    return nbrHeuresSup

print(calculerHeuresSup(9,0,9,0,1.5,1,0.75)) #0
print(calculerHeuresSup(9,6,0,0,1.5,1,0.75)) #0
print(calculerHeuresSup(9,0,0,12,1.5,1,0.75)) #0
print(calculerHeuresSup(9,0,0,14,1.5,1,0.75)) #2
print(calculerHeuresSup(9,0,11,0,1.5,1,0.75)) #2
print(calculerHeuresSup(9,8,0,0,1.5,1,0.75)) #2
print(calculerHeuresSup(9,6,2,0,1.5,1,0.75)) #2
print(calculerHeuresSup(9,6,2,2,1.5,1,0.75)) #4
print(calculerHeuresSup(9,8,0,0,1.5,1,0.75)) #2
print(calculerHeuresSup(9,8,2,2,1.5,1,0.75)) #6
print(calculerHeuresSup(9,4,0,0,1.5,1,0.75)) #0
print(calculerHeuresSup(9,4,2,0,1.5,1,0.75)) #0
print(calculerHeuresSup(9,4,4,0,1.5,1,0.75)) #1
print(calculerHeuresSup(9,4,4,3,1.5,1,0.75)) #4
print(calculerHeuresSup(9,4,0,0,1.5,1,0.75)) #0
print(calculerHeuresSup(9,4,0,4,1.5,1,0.75)) #0
print(calculerHeuresSup(9,4,0,8,1.5,1,0.75)) #4
print(calculerHeuresSup(9,2,3,4,1.5,1,0.75)) #0
print(calculerHeuresSup(9,2,3,7,1.5,1,0.75)) #3


   