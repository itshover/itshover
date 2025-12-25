import React from 'react'
import { AnimatedIconProps } from '@/icons/types'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { CodeBlock } from './code-block';
import { CopyIcon, Terminal } from 'lucide-react';
import { TooltipArrow } from '@radix-ui/react-tooltip';
const IconCard = ({ name, icon: Icon }: { name: string; icon: React.FC<AnimatedIconProps> }) => {
    return (
        <div className='bg-background flex flex-col items-center justify-center gap-4 rounded-lg border p-4 shadow-sm transition-all hover:shadow-md w-48'>
            <div className='flex items-center justify-center p-2'>
                <Tooltip>
                    <TooltipTrigger><Icon size={56} /></TooltipTrigger>
                    <TooltipContent>{name}</TooltipContent>
                </Tooltip>
            </div>

            <div className='flex items-center gap-2'>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <CopyIcon size={16} />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side='bottom' className='bg-foreground text-background ' >
                        <p>Copy {name}.tsx file</p>
                    </TooltipContent>
                </Tooltip>


                <Tooltip>
                    <TooltipTrigger asChild>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <Terminal size={16} />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side='bottom' className='bg-foreground text-background ' >
                        <p>Copy JSX</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    )
}

export default IconCard