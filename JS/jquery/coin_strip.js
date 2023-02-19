function randint(a, b){
	return Math.floor(((b+1)-a)*Math.random() + a);
}

function creer_bande(taille, nb_pieces){
	tab = new Array(taille).fill(0);
	// on interdit la première case
	var emplacements = taille-1;
	// on place les nb_pieces
	for (var i=0; i<nb_pieces; i++){
		// index au hasard parmi les indexs restants
		index = randint(0, emplacements-1);
		// on détermine l'emplacement réel k dans la bande
		var k = 1;
		while (index>=0){
			if (tab[k]==0){
				index--;
			}
			k++;
		}
		tab[k-1] = 1;
		emplacements--;
	}
	return tab;
}

function clic(){
	var i = $("td").index(this);
	console.log(`Vous avez cliqué sur la case ${i}.`);
	if (bande[i]==1){
		alert("Il y a déjà une pièce ici.");
	}
	else{
		// on cherche le premier j>i
		// tel que bande[j] = 1
		var j = i+1;
		var trouve = false;
		while (j<longueur_bande && !trouve){
			if (bande[j]==1){
				trouve = true;
			}
			else{
				j++;
			}
		}
		if (trouve){
			// on déplace la pièce
			bande[i] = 1;
			bande[j] = 0;
			maj();
		}
		else{
			alert("Il n'y a pas de pièce à droite.");
		}
	}
}

function maj(){
	// mise-à-jour de l'affichage
	$("td").removeClass("piece");
	for (var i=0; i<longueur_bande; i++){
		if (bande[i]==1){
			$("td").eq(i).addClass("piece");
		}
	}
}


// début du programme
var nb_pieces = 3;
var longueur_bande = 10;
for (var i=0; i<longueur_bande; i++){
	$("tr").append("<td></td>");
}
var bande = creer_bande(longueur_bande, nb_pieces);
$("td").click(clic);
maj();
