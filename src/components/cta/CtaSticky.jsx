import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CtaSticky = () => {
    // const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    return (
            <div className="cta-sticky fixed right-5 bottom-5 md:bottom-14 z-[20]">
                {/* <div className={'overflow-hidden trasition duration-300 flex flex-col justify-center w-full '+ (expanded?'h-20':'h-0') }>
                        <div>a</div>
                        <div>b</div>
                        <div>c</div>
                    </div> */}
                <button className="h-12 w-12 md:h-16 md:w-16" style={{
                    backgroundImage: `url('/assets/icons/plus.svg')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
                    onClick={() => {
                        navigate('/qs/upload')
                    }}
                ></button>
            </div>
    )
}
export default CtaSticky