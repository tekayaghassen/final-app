import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const myFunction = () => {alert ('Bonjour! Inscrivez vous pour consulter nos annoces. A bientôt!')};

function Accueil () { 
    
    return (
<div>

   <div className="imgacc">
   <span className='textacc'>Nous prenons soin de vos enfants</span> 
   </div>

   <div className="imgajouter">
   <Link to='/Private' className='textajouter'>Cliquez pour ajouter ou répondre à une annonce</Link>
   </div>


    {/* Annonces */}
    <h1 className="titre">EXEMPLES D'ANNONCES</h1> <hr/>
    <section className='temoignages'>
    <div className='letem1'>
    <div className='tem1'>
    <img className='imgtem1' src='https://thumbs.dreamstime.com/z/femme-avec-deux-enfants-en-bas-%C3%A2ge-ex%C3%A9cutant-le-sourire-5771067.jpg'></img>
    <h6> Mariem Chebbi, Menzeh </h6>
    </div>
    <p className="partem">Ma fille est agée de 7 ans, je cherche une jeune femme qui peut s'occuper d'elle les mercredis après midi dans la zone d'El Menzeh. Merci!</p>
    </div>

    <div className='letem1'>
    <div className='tem1'>
    <img className='imgtem1' src='https://www.notretemps.com/cache/com_zoo_images/ac/femme-deux-enfants-jeunes-ok_333c4e1010f03ef86bb42821979213a9.jpg'></img>
    <h6> Kaouther Harbi, Riadh Andalous </h6>
    </div>
    <p className="partem">J'ai deux enfants 4 ans et 6 ans, je cherche une femme qui est disponible le samedi !</p>
    </div>

    <div className='letem1'>
    <div className='tem1'>
    <img className='imgtem1' src='https://cdn.pixabay.com/photo/2018/02/07/19/48/portrait-3137833_960_720.jpg'></img>
    <h6> Syrine Mejri, 22 ans </h6>
    </div>
    <p className="partem">Je cherche des enfants à garder dans la zone de Ariana pendant les weekends :)</p>
    </div>
    </section>


{/* Valeurs */}
    <h1 className="titre">NOS VALEURS</h1> <hr/>
    <section className='temoignages'>
    <div className='valeur'>
    <img className='imgval1' src='https://www.primeum.com/hubfs/Imported_Blog_Media/Elaborer-une-prime-sur-objectif-efficace.jpg'></img>
    <h3> EFFICACE </h3>
    <p className="partemm">Tous les jours, des centaines de nouvelles annonces.</p>
    </div>

    <div className='valeur'>
    <img className='imgval1' src='https://static.efficaciteprofessionnelle.fr/wp-content/uploads/2017/05/03170544/confiance-peur-shutterstock_236997409.jpg'></img>
    <h3> En confiance</h3>
    <p className="partemm">Profils complets, vérifications, avis : recrutez sereinement.</p>
    </div>

    <div className='valeur'>
    <img className='imgval1' src='https://www.leparisien.fr/resizer/Crxhrmm8LHyEX7u_33uqBhAACT0=/932x582/cloudfront-eu-central-1.images.arcpublishing.com/leparisien/XWOVEIJ4O7D45ESQMCSDJPCOF4.jpg'></img>
    <h3> Responsabilité  </h3>
    <p className="partemm">Nous avons un grand sens de la responsabilité et du devoir</p>
    </div>
    </section>
    
   
    {/* Témoignage */}
    <h1 className="titre">TEMOIGNAGES</h1> <hr/>
    <section className='temoignages'>
    <div className='letem1'>
    <div className='tem1'>
    <img className='imgtem1' src='https://cache.marieclaire.fr/data/photo/w600_h315_ci/4z/femme-sourire-quadra.jpg'></img>
    <h3> C'est très intéressant ! </h3>
    </div>
    <p className="partem">J'ai une fille agée de 3 ans et je suis très satisfaite de votre service.</p>
    </div>

    <div className='letem1'>
    <div className='tem1'>
    <img className='imgtem1' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsUakqGAHBwRVP-S5W5K0cueoZnavjdM3USA&usqp=CAU'></img>
    <h3> Je suis très satisfaite ... </h3>
    </div>
    <p className="partem">Ils sont très serieux dans leur travail, je suis contente!</p>
    </div>

    <div className='letem1'>
    <div className='tem1'>
    <img className='imgtem1' src='https://media.istockphoto.com/videos/portrait-of-mature-woman-at-home-video-id1193591634?s=640x640'></img>
    <h3> Rien à dire ! </h3>
    </div>
    <p className="partem">Notre enfant adore sa nounou et a confiance en elle. Merci !</p>
    </div>
    </section>

{/* Annoces par villes */}

    <section>
       
        <h1 className="titre">ANNONCES PAR VILLES</h1>
        <hr></hr>
        <div className='annonce'>
        <Link to='/NM'>Nounou Menzeh</Link> 
        <Link to='/PM'>Parents Menzeh</Link> 
        </div>
        <div className='annonce'>
        <Link to='/NMarsa'>Nounou Marsa</Link> 
        <Link to='/PMarsa'>Parents Marsa</Link> 
        </div>
        <div className='annonce'>
        <Link to='/NA'>Nounou Ariana</Link> 
        <Link to='/PA'>Parents Ariana</Link> 
        </div>
        
    </section>

    <section className='rejoignez'>
    <h1 className='titrerej'>Rejoignez nous</h1>
    <button className='register-btn'><Link className='register' to='/register'>Register</Link> </button> 
    </section>

   {/*  Qui sommes nous */}
   <section className='avderniere'>
    <div className='quisomnous'>
    <h3>Nos annonces</h3>
    <h3>Qui sommes nous ?</h3>
    <h3>Contact</h3>
    </div> 

    <div className='quisomnous'>
    <div className='par1'>
    <Link to='/GEALL'>Garde d'enfants</Link> <br></br>
    <Link to='/NNALL'>Nounou à domicile</Link>
    </div> 

    <div>
    <p className='pquisomnous'>Nous sommes spécialisés dans la garde d'enfants à domicile et proposons des prestations sur-mesure, adaptées à votre rythme et à vos besoins spécifiques.</p>
    </div>

    <div className='email'>
        <p>Email: </p>
        <p className='admail'>contact@childcare.com </p>
    </div>
    </div> 
   </section>

   <footer className='footer'>
   © 2021 Childcare. Tous droits réservés.
   </footer>

</div>
)
}

export default Accueil;