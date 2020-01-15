import {TextureGroup, ComplexModelPart, ModelPart} from './texture-group'
import * as THREE from "three";

var top : ComplexModelPart;

function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateShirtTint(tint) {
    top.updateTint(0, tint);
    top.setTexture();
}

async function until(fn:any) {
    while (!fn()) {
        await sleep(0)
    }
}

async function init() {
    let me : THREE.Object3D = document.querySelector("#me").getObject3D('mesh');
    console.log(me);

    let hair_tex = new TextureGroup('hair/', ['Auburn','Black','Blair']);
    let shirt_tex = new TextureGroup('shirt/', ['white']);
    let jacket_tex = new TextureGroup('jacket/', ['white']);

    await until(() => hair_tex.loaded == true && shirt_tex.loaded==true && jacket_tex.loaded ==true);
    //shirt_tex.tint = '#00ff00';
    top = new ComplexModelPart(me.getObjectByName('Top'), [shirt_tex,jacket_tex]);
    let hair = new ModelPart(me.getObjectByName('Hair'), hair_tex);


    top.setTexture();
    hair.setTexture();

}


window.onload = init;