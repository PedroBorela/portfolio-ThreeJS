import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
const Target = (props) => {
    const targetRef = useRef();
    // URL QUEBRADA: O link original do Supabase não existe mais.
    // Substituindo por um objeto simples para evitar que o site trave.
    // const {scene} = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf')

    useGSAP(() => {
        gsap.to(targetRef.current.position, {
            y: targetRef.current.position.y + 0.5,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
        });
    });

    return (
        <mesh {...props} ref={targetRef} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
            {/* Fallback visual: Cilindro simples porque o modelo original não carrega */}
            <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
            <meshBasicMaterial color="#d4a373" />
        </mesh>
    )
}

export default Target