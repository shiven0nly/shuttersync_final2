'use client';

import React from 'react';
import { ArrowLeftIcon, ArrowPathIcon, ArrowRightIcon, ArrowTopRightOnSquareIcon, ArrowUpRightIcon, Bars3Icon, BellIcon, BookOpenIcon, CalendarIcon, CameraIcon, ChatBubbleLeftRightIcon, CheckCircleIcon, CheckIcon, ChevronDownIcon, ClockIcon, EnvelopeIcon, EyeIcon, HomeIcon, MapPinIcon, PhoneIcon, QuestionMarkCircleIcon, SparklesIcon, Squares2X2Icon, UserGroupIcon, XMarkIcon, GlobeAltIcon, AcademicCapIcon, TrophyIcon, MapIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon as ArrowLeftIconSolid, ArrowPathIcon as ArrowPathIconSolid, ArrowRightIcon as ArrowRightIconSolid, ArrowTopRightOnSquareIcon as ArrowTopRightOnSquareIconSolid, ArrowUpRightIcon as ArrowUpRightIconSolid, Bars3Icon as Bars3IconSolid, BellIcon as BellIconSolid, BookOpenIcon as BookOpenIconSolid, CalendarIcon as CalendarIconSolid, CameraIcon as CameraIconSolid, ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid, CheckCircleIcon as CheckCircleIconSolid, CheckIcon as CheckIconSolid, ChevronDownIcon as ChevronDownIconSolid, ClockIcon as ClockIconSolid, EnvelopeIcon as EnvelopeIconSolid, EyeIcon as EyeIconSolid, HomeIcon as HomeIconSolid, MapPinIcon as MapPinIconSolid, PhoneIcon as PhoneIconSolid, QuestionMarkCircleIcon as QuestionMarkCircleIconSolid, SparklesIcon as SparklesIconSolid, Squares2X2Icon as Squares2X2IconSolid, UserGroupIcon as UserGroupIconSolid, XMarkIcon as XMarkIconSolid, GlobeAltIcon as GlobeAltIconSolid, AcademicCapIcon as AcademicCapIconSolid, TrophyIcon as TrophyIconSolid, MapIcon as MapIconSolid } from '@heroicons/react/24/solid';

type IconVariant = 'outline' | 'solid';

interface IconProps {
    name: string;
    variant?: IconVariant;
    size?: number;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    [key: string]: any;
}

const outlineIcons: Record<string, React.ComponentType<any>> = {
    'ArrowLeftIcon': ArrowLeftIcon,
    'ArrowPathIcon': ArrowPathIcon,
    'ArrowRightIcon': ArrowRightIcon,
    'ArrowTopRightOnSquareIcon': ArrowTopRightOnSquareIcon,
    'ArrowUpRightIcon': ArrowUpRightIcon,
    'Bars3Icon': Bars3Icon,
    'BellIcon': BellIcon,
    'BookOpenIcon': BookOpenIcon,
    'CalendarIcon': CalendarIcon,
    'CameraIcon': CameraIcon,
    'ChatBubbleLeftRightIcon': ChatBubbleLeftRightIcon,
    'CheckCircleIcon': CheckCircleIcon,
    'CheckIcon': CheckIcon,
    'ChevronDownIcon': ChevronDownIcon,
    'ClockIcon': ClockIcon,
    'EnvelopeIcon': EnvelopeIcon,
    'EyeIcon': EyeIcon,
    'HomeIcon': HomeIcon,
    'MapPinIcon': MapPinIcon,
    'PhoneIcon': PhoneIcon,
    'QuestionMarkCircleIcon': QuestionMarkCircleIcon,
    'SparklesIcon': SparklesIcon,
    'Squares2X2Icon': Squares2X2Icon,
    'UserGroupIcon': UserGroupIcon,
    'XMarkIcon': XMarkIcon,
    'GlobeAltIcon': GlobeAltIcon,
    'AcademicCapIcon': AcademicCapIcon,
    'TrophyIcon': TrophyIcon,
    'MapIcon': MapIcon,
};

const solidIcons: Record<string, React.ComponentType<any>> = {
    'ArrowLeftIcon': ArrowLeftIconSolid,
    'ArrowPathIcon': ArrowPathIconSolid,
    'ArrowRightIcon': ArrowRightIconSolid,
    'ArrowTopRightOnSquareIcon': ArrowTopRightOnSquareIconSolid,
    'ArrowUpRightIcon': ArrowUpRightIconSolid,
    'Bars3Icon': Bars3IconSolid,
    'BellIcon': BellIconSolid,
    'BookOpenIcon': BookOpenIconSolid,
    'CalendarIcon': CalendarIconSolid,
    'CameraIcon': CameraIconSolid,
    'ChatBubbleLeftRightIcon': ChatBubbleLeftRightIconSolid,
    'CheckCircleIcon': CheckCircleIconSolid,
    'CheckIcon': CheckIconSolid,
    'ChevronDownIcon': ChevronDownIconSolid,
    'ClockIcon': ClockIconSolid,
    'EnvelopeIcon': EnvelopeIconSolid,
    'EyeIcon': EyeIconSolid,
    'HomeIcon': HomeIconSolid,
    'MapPinIcon': MapPinIconSolid,
    'PhoneIcon': PhoneIconSolid,
    'QuestionMarkCircleIcon': QuestionMarkCircleIconSolid,
    'SparklesIcon': SparklesIconSolid,
    'Squares2X2Icon': Squares2X2IconSolid,
    'UserGroupIcon': UserGroupIconSolid,
    'XMarkIcon': XMarkIconSolid,
    'GlobeAltIcon': GlobeAltIconSolid,
    'AcademicCapIcon': AcademicCapIconSolid,
    'TrophyIcon': TrophyIconSolid,
    'MapIcon': MapIconSolid,
};


function Icon({
    name,
    variant = 'outline',
    size = 24,
    className = '',
    onClick,
    disabled = false,
    ...props
}: IconProps) {
    const iconSet = variant === 'solid' ? solidIcons : outlineIcons;
    const IconComponent = iconSet[name];

    if (!IconComponent) {
        return (
            <QuestionMarkCircleIcon
                width={size}
                height={size}
                className={`text-gray-400 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
                onClick={disabled ? undefined : onClick}
                {...props}
            />
        );
    }

    return (
        <IconComponent
            width={size}
            height={size}
            className={`${disabled ? 'opacity-50 cursor-not-allowed' : onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
            onClick={disabled ? undefined : onClick}
            {...props}
        />
    );
}

export default Icon;
