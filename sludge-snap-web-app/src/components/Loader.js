import { Cog } from './icons/outline';
import cn from 'classnames';

export default function Loader({ size, className, children }) {
    const cogSize = size || 6;
    return (
        <div className="flex items-center justify-center">
            <Cog
                className={cn(
                    `w-${cogSize} h-${cogSize} mr-2 animate-spin-slow`,
                    className
                )}
            />
            {children}
        </div>
    );
}
