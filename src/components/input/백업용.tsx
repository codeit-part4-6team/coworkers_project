// import { InputProp } from '@/types/InputProp';
// import clsx from 'clsx';
// import VisbilityIcon from '@/assets/password_visbility_on.svg';
// import UnVisbilityIcon from '@/assets/password_visbility_off.svg';
// import { useState } from 'react';

// export default function Input({
//   labeltext,
//   option,
//   inputSize,
//   placeholder,
//   pattern,
//   onChange = undefined,
//   onBlur = undefined,
//   ...rest
// }: InputProp & { ref?: React.Ref<HTMLInputElement> }) {
//   const [isVisible, setIsVisible] = useState<boolean>(false);
//   const [inputType, setInputType] = useState<string>(option);

//   const defaultClassName = `rounded-[12px] p-4 placeholder-text-default 
//                             bg-background-secondary text-text-primary font-regular
//                             border-solid border-[1px] outline-none`;

//   const optionClassName = ` border-border-primary-10
//                 hover:border-interaction-hover
//                 focus:border-interaction-focus
//                 disabled:border-interacion-inactive disabled:cursor-not-allowed`;

//   const isInvalid = `invalid:border-status-danger`;

//   const sizeClassName = clsx(
//     inputSize === 'large' && 'text-lg',
//     inputSize === 'small' && 'text-md',
//   );

//   const iconClassName = `absolute right-4 top-1/2 transform -translate-y-1/2`;

//   const visibilityCheckEvent = () => {
//     setIsVisible(!isVisible);
//     setInputType(isVisible ? 'password' : 'text');
//   };

//   return (
//     <div
//       className={clsx(
//         inputSize === 'large' && `w-full h-[79px]`,
//         inputSize === 'small' && `w-full h-[44px]`,
//       )}
//     >
//       <p className={`mb-4 text-text-primary text-lg font-medium`}>
//         {labeltext}
//       </p>
//       <div className={`relative w-fit`}>
//         <input
//           ref={rest.ref}
//           type={inputType}
//           placeholder={placeholder}
//           pattern={pattern}
//           className={clsx(
//             defaultClassName,
//             optionClassName,
//             sizeClassName,
//             isInvalid,
//           )}
//           onChange={onChange ? onChange : undefined}
//           onBlur={onBlur ? onBlur : undefined}
//         />
//         {option === 'password' &&
//           (isVisible ? (
//             <VisbilityIcon
//               className={iconClassName}
//               onClick={visibilityCheckEvent}
//             />
//           ) : (
//             <UnVisbilityIcon
//               className={iconClassName}
//               onClick={visibilityCheckEvent}
//             />
//           ))}
//       </div>
//       <div className="text-status-danger">{pattern ? pattern.inputErrorMessage() : undefined}</div>
//     </div>
//   );
// }
