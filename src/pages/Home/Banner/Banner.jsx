import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Slide } from "react-awesome-reveal";
import { Carousel } from 'react-responsive-carousel';
import slide1 from '../../../assets/images/home/slider/slider-1.png'
import slide2 from '../../../assets/images/home/slider/slider-2.png'
import slide3 from '../../../assets/images/home/slider/slider-3.png'
import slide4 from '../../../assets/images/home/slider/slider-4.png'
import slide5 from '../../../assets/images/home/slider/slider-5.png'
import slide6 from '../../../assets/images/home/slider/slider-6.png'
import './Banner.css'



const Banner = () => {
    return (
        <div>
            <Carousel showArrows={true} >
                <div className="relative">
                    <img className="" src={slide1} alt="Slider Image" />
                    <div className="absolute bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] text-white flex items-center justify-center z-0 px-10 md:px-20 top-0 h-full mx-auto w-full">
                        <div className='text-center lg:w-2/3 max-auto'>
                            <Slide direction="left" duration={2000}>
                                <h2 className="font-bold text-2xl md:text-4xl lg:text-5xl mb-5 md:mb-10 text-orange-500">Soccer Training</h2>
                            </Slide>
                            <p className="hidden md:block">
                                Summer camp soccer training focuses on technical skills, tactical understanding, and game awareness. Fitness exercises improve stamina, while emphasizing sportsmanship and teamwork. Training is engaging and fun, with games and challenges to motivate participants. The goal is to enhance skills and love for the game in a positive environment.
                            </p>
                            <button className='btn btn-outline btn-xs md:btn-md hover:bg-orange-500 text-white md:mt-10'>See details about classes</button>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={slide2} />
                    <div className="absolute bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] text-white flex items-center justify-center z-0 px-10 md:px-20 top-0 h-full mx-auto w-full">
                        <div className='text-center lg:w-2/3 max-auto'>
                            <Slide direction="left" duration={2000}>
                                <h2 className="font-bold text-2xl md:text-4xl lg:text-5xl mb-5 md:mb-10 text-orange-500">Basketball Skills Development</h2>
                            </Slide>
                            <p className="hidden md:block">Basketball Skills Development programs focus on improving fundamental basketball skills. Participants learn and practice key elements such as dribbling, shooting, passing, and defensive techniques. Emphasis is placed on developing individual skills, as well as team play and game strategies. These programs aim to enhance players abilities and basketball knowledge through structured training sessions and engaging drills and exercises.</p>
                            <button className='btn btn-outline btn-xs md:btn-md hover:bg-orange-500 text-white md:mt-10'>See details about classes</button>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={slide3} />
                    <div className="absolute bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] text-white flex items-center justify-center z-0 px-10 md:px-20 top-0 h-full mx-auto w-full">
                        <div className='text-center lg:w-2/3 max-auto'>
                            <Slide direction="left" duration={2000}>
                                <h2 className="font-bold text-2xl md:text-4xl lg:text-5xl mb-5 md:mb-10 text-orange-500">Tennis Camp</h2>
                            </Slide>
                            <p className="hidden md:block">Tennis Camps provide a comprehensive learning experience for participants of all skill levels. These camps focus on developing various aspects of the game, including technique, footwork, strategy, and match play. Participants receive expert coaching, engage in drills and practice sessions, and have opportunities for friendly competitions. The goal is to improve players skills, foster a love for tennis, and create a supportive and enjoyable environment for all.</p>
                            <button className='btn btn-outline btn-xs md:btn-md hover:bg-orange-500 text-white md:mt-10'>See details about classes</button>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={slide4} />
                    <div className="absolute bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] text-white flex items-center justify-center z-0 px-10 md:px-20 top-0 h-full mx-auto w-full">
                        <div className='text-center lg:w-2/3 max-auto'>
                            <Slide direction="left" duration={2000}>
                                <h2 className="font-bold text-2xl md:text-4xl lg:text-5xl mb-5 md:mb-10 text-orange-500">Swimming Lessons</h2>
                            </Slide>
                            <p className="hidden md:block">Swimming lessons offer a structured learning environment for individuals to develop swimming skills. Participants are guided by experienced instructors who teach proper techniques, including strokes, breathing, and water safety. Lessons cater to different skill levels and focus on building confidence and proficiency in the water. Through progressive instruction and practice, participants gain valuable swimming abilities and knowledge while fostering a safe and enjoyable swimming experience.</p>
                            <button className='btn btn-outline btn-xs md:btn-md hover:bg-orange-500 text-white md:mt-10'>See details about classes</button>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={slide5} />
                    <div className="absolute bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] text-white flex items-center justify-center z-0 px-10 md:px-20 top-0 h-full mx-auto w-full">
                        <div className='text-center lg:w-2/3 max-auto'>
                            <Slide direction="left" duration={2000}>
                                <h2 className="font-bold text-2xl md:text-4xl lg:text-5xl mb-5 md:mb-10 text-orange-500">Volleyball Clinic</h2>
                            </Slide>
                            <p className="hidden md:block">Volleyball clinics provide specialized training for individuals interested in improving their volleyball skills. Led by experienced coaches, these clinics focus on fundamental techniques such as serving, passing, setting, attacking, and blocking. Participants engage in drills, practice sessions, and game simulations to refine their skills and enhance their overall performance. The clinics aim to develop players volleyball abilities, promote teamwork, and foster a passion for the sport in a supportive and dynamic learning environment.</p>
                            <button className='btn btn-outline btn-xs md:btn-md hover:bg-orange-500 text-white md:mt-10'>See details about classes</button>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={slide6} />
                    <div className="absolute bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] text-white flex items-center justify-center z-0 px-10 md:px-20 top-0 h-full mx-auto w-full">
                        <div className='text-center lg:w-2/3 max-auto'>
                            <Slide direction="left" duration={2000}>
                                <h2 className="font-bold text-2xl md:text-4xl lg:text-5xl mb-5 md:mb-10 text-orange-500">Baseball Skills Camp</h2>
                            </Slide>
                            <p className="hidden md:block">Baseball Skills Camps offer comprehensive training for individuals looking to improve their baseball abilities. Led by knowledgeable coaches, these camps focus on key aspects such as hitting, pitching, fielding, base running, and game strategies. Participants engage in drills, practice sessions, and simulated game situations to enhance their skills and understanding of the sport. The camps aim to develop players baseball skills, foster teamwork, and cultivate a love for the game in a fun and supportive environment.</p>
                            <button className='btn btn-outline btn-xs md:btn-md hover:bg-orange-500 text-white md:mt-10'>See details about classes</button>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;