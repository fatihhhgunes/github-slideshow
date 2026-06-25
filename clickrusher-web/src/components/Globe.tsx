import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TEAMS } from '../data/teams';

const FLAG_BASE = 'https://flagcdn.com/w320/';
const N = 48;

function fibSphere(n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = phi * i;
    pts.push([r * Math.cos(t), y, r * Math.sin(t)]);
  }
  return pts;
}

const VERT = `varying vec3 vPos;varying vec3 vNrm;varying vec2 vUV;
void main(){vPos=normalize(position);vNrm=normalize(normalMatrix*normal);vUV=uv;
gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;

const INNER_LIGHT = `
  float bd=md-sd;
  float coronaW=0.09;
  if(bd<coronaW){float ct=1.0-bd/coronaW;float cg=pow(ct,3.0);float breathe=0.5+0.5*sin(time*1.8+nu*15.0);
    vec3 warmGlow=vec3(1.0,0.58+0.12*breathe,0.04);fc=mix(fc,warmGlow*2.5,cg*0.38);}
  float crackW=0.008;
  if(bd<crackW){float t=1.0-bd/crackW;float g=pow(t,0.6);float flicker=0.5+0.5*sin(time*5.0+nu*40.0);
    vec3 hotCore=mix(vec3(1.0,0.82,0.3),vec3(1.0,1.0,0.95),pow(g,0.4));
    float brightness=3.5+1.5*flicker*g;fc=mix(fc,hotCore*brightness,g*0.99);}
  float lit=0.5+0.5*dot(vNrm,normalize(vec3(0.4,0.6,1.0)));fc*=(0.58+0.42*lit);
  float fr=1.0-abs(dot(vNrm,vec3(0.,0.,1.)));fr=fr*fr*fr;
  fc=mix(fc,vec3(1.0,0.58,0.08)*1.6,fr*0.28);
  gl_FragColor=vec4(fc,1.0);`;

const FRAG_COLOR = `uniform sampler2D sTex,c1Tex,c2Tex;uniform float time;
varying vec3 vPos,vNrm;varying vec2 vUV;const int N=48;
float tu(int i){return(float(i)+.5)/float(N);}
vec3 seed(float u){return texture2D(sTex,vec2(u,.5)).rgb*2.-1.;}
void main(){vec3 dir=vPos;float md=-2.,sd=-2.,nu=0.;
  for(int i=0;i<N;i++){float u=tu(i);float d=dot(dir,seed(u));if(d>md){sd=md;md=d;nu=u;}else if(d>sd){sd=d;}}
  vec3 c1=texture2D(c1Tex,vec2(nu,.5)).rgb;vec3 c2=texture2D(c2Tex,vec2(nu,.5)).rgb;
  vec3 s=seed(nu);vec3 rt=normalize(cross(s,vec3(0.,1.,0.)));if(length(rt)<.01)rt=vec3(1.,0.,0.);
  vec3 lu=normalize(cross(rt,s));float pv=dot(dir,lu)*5.;float st=fract(pv+1.5);
  vec3 fc;if(st<.333)fc=c1;else if(st<.667)fc=mix(c1,c2,.5);else fc=c2;
  ${INNER_LIGHT}}`;

const FRAG_FLAG = `uniform sampler2D flagTex,sTex;uniform float time;
varying vec3 vPos,vNrm;varying vec2 vUV;const int N=48;
float tu(int i){return(float(i)+.5)/float(N);}
vec3 seed(float u){return texture2D(sTex,vec2(u,.5)).rgb*2.-1.;}
void main(){vec3 dir=vPos;float md=-2.,sd=-2.,nu=0.;
  for(int i=0;i<N;i++){float u=tu(i);float d=dot(dir,seed(u));if(d>md){sd=md;md=d;nu=u;}else if(d>sd){sd=d;}}
  vec3 fc=texture2D(flagTex,vUV).rgb;
  ${INNER_LIGHT}}`;

interface Props {
  onTeamClick: (team: any) => void;
}

export default function Globe({ onTeamClick }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const onClickRef = useRef(onTeamClick);
  onClickRef.current = onTeamClick;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.offsetWidth;
    const H = Math.min(320, window.innerHeight * 0.42);

    const seeds = fibSphere(N);
    const teams = TEAMS.map((t, i) => ({ ...t, seed: seeds[i] }));

    const makeDTex = (arr: Uint8Array) => {
      const tex = new THREE.DataTexture(arr, N, 1, THREE.RGBAFormat, THREE.UnsignedByteType);
      tex.needsUpdate = true;
      return tex;
    };
    const sArr = new Uint8Array(N * 4);
    const c1A  = new Uint8Array(N * 4);
    const c2A  = new Uint8Array(N * 4);
    teams.forEach((t, i) => {
      sArr[i*4]=Math.round((t.seed[0]+1)*127.5); sArr[i*4+1]=Math.round((t.seed[1]+1)*127.5);
      sArr[i*4+2]=Math.round((t.seed[2]+1)*127.5); sArr[i*4+3]=255;
      c1A[i*4]=t.c1[0]; c1A[i*4+1]=t.c1[1]; c1A[i*4+2]=t.c1[2]; c1A[i*4+3]=255;
      c2A[i*4]=t.c2[0]; c2A[i*4+1]=t.c2[1]; c2A[i*4+2]=t.c2[2]; c2A[i*4+3]=255;
    });
    const sTex = makeDTex(sArr), c1Tex = makeDTex(c1A), c2Tex = makeDTex(c2A);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(devicePixelRatio * 1.5, 3));
    container.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.z = 2.9;

    const matColor = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG_COLOR,
      uniforms: { sTex:{value:sTex}, c1Tex:{value:c1Tex}, c2Tex:{value:c2Tex}, time:{value:0} },
    });
    const globe = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 96), matColor);
    scene.add(globe);

    const atm = new THREE.Mesh(
      new THREE.SphereGeometry(1.1, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xFF8800, transparent: true, opacity: 0.07, side: THREE.BackSide })
    );
    scene.add(atm);

    let drag=false, auto=true, vx=0, vy=0, px=0, py=0, csX=0, csY=0;
    const cvs = renderer.domElement;

    function handleClick(ex: number, ey: number) {
      const rect = cvs.getBoundingClientRect();
      const ray = new THREE.Raycaster();
      ray.setFromCamera(
        new THREE.Vector2(((ex-rect.left)/rect.width)*2-1, -((ey-rect.top)/rect.height)*2+1),
        camera
      );
      const hits = ray.intersectObject(globe);
      if (!hits.length) return;
      const local = hits[0].point.clone().applyQuaternion(globe.quaternion.clone().invert()).normalize();
      let best=-1, bd=-2;
      teams.forEach((t,i) => { const d=local.dot(new THREE.Vector3(...t.seed)); if(d>bd){bd=d;best=i;} });
      if (best >= 0) onClickRef.current(teams[best]);
    }

    const onMouseDown = (e: MouseEvent) => { drag=true; auto=false; px=e.clientX; py=e.clientY; csX=px; csY=py; vx=0; vy=0; };
    const onMouseMove = (e: MouseEvent) => {
      if (!drag) return;
      vy=(e.clientX-px)*0.006; vx=(e.clientY-py)*0.006;
      globe.rotation.x+=vx; globe.rotation.y+=vy; atm.rotation.copy(globe.rotation);
      px=e.clientX; py=e.clientY;
    };
    const onMouseUp = (e: MouseEvent) => {
      drag=false;
      if (Math.hypot(e.clientX-csX, e.clientY-csY) < 5) handleClick(e.clientX, e.clientY);
    };
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault(); drag=true; auto=false;
      px=e.touches[0].clientX; py=e.touches[0].clientY; csX=px; csY=py; vx=0; vy=0;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault(); if(!drag) return;
      vy=(e.touches[0].clientX-px)*0.006; vx=(e.touches[0].clientY-py)*0.006;
      globe.rotation.x+=vx; globe.rotation.y+=vy; atm.rotation.copy(globe.rotation);
      px=e.touches[0].clientX; py=e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      drag=false;
      const t=e.changedTouches[0];
      if (Math.hypot(t.clientX-csX, t.clientY-csY) < 8) handleClick(t.clientX, t.clientY);
    };

    cvs.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    cvs.addEventListener('touchstart', onTouchStart, { passive: false });
    cvs.addEventListener('touchmove', onTouchMove, { passive: false });
    cvs.addEventListener('touchend', onTouchEnd);

    const clock = new THREE.Clock();
    let animId: number;
    const loop = () => {
      animId = requestAnimationFrame(loop);
      const mat = globe.material as THREE.ShaderMaterial;
      if (mat.uniforms) mat.uniforms.time.value = clock.getElapsedTime();
      if (!drag) {
        vx*=0.94; vy*=0.94;
        globe.rotation.x+=vx; globe.rotation.y+=vy;
        if (auto) globe.rotation.y += 0.0025;
        atm.rotation.copy(globe.rotation);
      }
      renderer.render(scene, camera);
    };
    loop();

    // Async flag texture
    (async () => {
      const allCodes = [...new Set(teams.map(t => t.fc))];
      const flagImgs: Record<string, HTMLImageElement> = {};
      await Promise.all(allCodes.map(fc => new Promise<void>(res => {
        const img = new Image(); img.crossOrigin='anonymous';
        img.onload = () => { flagImgs[fc]=img; res(); };
        img.onerror = () => res();
        img.src = FLAG_BASE + fc + '.png';
      })));
      const TW=1024, TH=512, FW=320, FH=200;
      const c=document.createElement('canvas'); c.width=TW; c.height=TH;
      const ctx=c.getContext('2d')!;
      const fdata: Record<string, Uint8ClampedArray> = {};
      teams.forEach(t => {
        if (!flagImgs[t.fc]) return;
        const fc2=document.createElement('canvas'); fc2.width=FW; fc2.height=FH;
        const fctx=fc2.getContext('2d')!; fctx.drawImage(flagImgs[t.fc],0,0,FW,FH);
        try { fdata[t.fc]=fctx.getImageData(0,0,FW,FH).data; } catch {}
      });
      const imgd=ctx.createImageData(TW,TH); const p=imgd.data; const sv=teams.map(t=>t.seed);
      for (let py2=0; py2<TH; py2++) {
        const phi=(py2/TH)*Math.PI, sinPhi=Math.sin(phi), cosPhi=Math.cos(phi);
        for (let ppx=0; ppx<TW; ppx++) {
          const theta=(ppx/TW)*2*Math.PI;
          const x=-sinPhi*Math.cos(theta), y=cosPhi, z=sinPhi*Math.sin(theta);
          let md2=-2, ni=0;
          for (let i=0;i<N;i++){const s=sv[i],d=x*s[0]+y*s[1]+z*s[2];if(d>md2){md2=d;ni=i;}}
          const pidx=(py2*TW+ppx)*4, team=teams[ni], fd=fdata[team.fc];
          if (fd) {
            const s=sv[ni], rLen=Math.sqrt(s[2]*s[2]+s[0]*s[0]);
            let nrx,nrz; if(rLen>.001){nrx=s[2]/rLen;nrz=-s[0]/rLen;}else{nrx=1;nrz=0;}
            const ux=0*s[2]-nrz*s[1], uy=nrz*s[0]-nrx*s[2], uz=nrx*s[1];
            const uLen=Math.sqrt(ux*ux+uy*uy+uz*uz), nux=ux/uLen, nuy=uy/uLen, nuz=uz/uLen;
            const ph=x*nrx+z*nrz, pv2=x*nux+y*nuy+z*nuz, scale=2.8;
            const fu=Math.max(0,Math.min(1,ph*scale+0.5)), fv=Math.max(0,Math.min(1,-pv2*scale+0.5));
            const fxr=fu*(FW-1), fyr=fv*(FH-1), x0=Math.floor(fxr), y0=Math.floor(fyr);
            const x1=Math.min(x0+1,FW-1), y1=Math.min(y0+1,FH-1), wx=fxr-x0, wy=fyr-y0;
            for (let ch=0;ch<3;ch++){
              const v00=fd[(y0*FW+x0)*4+ch],v10=fd[(y0*FW+x1)*4+ch];
              const v01=fd[(y1*FW+x0)*4+ch],v11=fd[(y1*FW+x1)*4+ch];
              p[pidx+ch]=Math.round(v00*(1-wx)*(1-wy)+v10*wx*(1-wy)+v01*(1-wx)*wy+v11*wx*wy);
            }
            p[pidx+3]=255;
          } else { p[pidx]=team.c1[0]; p[pidx+1]=team.c1[1]; p[pidx+2]=team.c1[2]; p[pidx+3]=255; }
        }
      }
      ctx.putImageData(imgd,0,0);
      const flagTex=new THREE.CanvasTexture(c);
      flagTex.anisotropy=renderer.capabilities.getMaxAnisotropy(); flagTex.needsUpdate=true;
      globe.material=new THREE.ShaderMaterial({
        vertexShader:VERT, fragmentShader:FRAG_FLAG,
        uniforms:{flagTex:{value:flagTex},sTex:{value:sTex},time:{value:0}},
      });
    })();

    return () => {
      cancelAnimationFrame(animId);
      cvs.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      cvs.removeEventListener('touchstart', onTouchStart);
      cvs.removeEventListener('touchmove', onTouchMove);
      cvs.removeEventListener('touchend', onTouchEnd);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} style={{
      width: '100%',
      height: Math.min(320, window.innerHeight * 0.42),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }} />
  );
}
