import clsx from "clsx";
import s from './complex-page.module.scss';
import { Scene } from "@models_/scene"

export const ComplexPage = () => {
    return (
        <>
            <Scene />
            <div className={clsx(s['form'])}>

            </div>
        </>
    );
}