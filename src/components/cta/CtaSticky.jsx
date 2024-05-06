import { useState } from "react";
import { Link } from "react-router-dom";

const CtaSticky = () => {
    // const [expanded, setExpanded] = useState(false);

    return (
        <Link to="qs/upload" className="cta-sticky fixed right-5 bottom-5 md:bottom-14 z-5">
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
            }}></button>
        </Link>
    )
}
export default CtaSticky