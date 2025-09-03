import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type CommonProps = {
  /** 显示文本/节点 */
  label: React.ReactNode;
  /** 统一的点击事件（分别约束到对应元素） */
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  /** 自定义类名 */
  className?: string;
  /** 禁用态（<a> 用 aria-disabled + pointer-events） */
  disabled?: boolean;
};

type AnchorProps = CommonProps & {
  href: string; // 有 href -> 渲染为 <a>
} & Omit<HTMLMotionProps<"a">, "children" | "ref" | "onClick" | "href"> & {
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  };

type ButtonProps = CommonProps & {
  href?: undefined; // 无 href -> 渲染为 <button>
  type?: "button" | "submit" | "reset";
} & Omit<HTMLMotionProps<"button">, "children" | "ref" | "onClick"> & {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  };

export type GradientButtonProps = AnchorProps | ButtonProps;

const baseClasses =
  "inline-flex items-center justify-center rounded-3xl px-4 py-2 text-white " +
  "bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/20 " +
  "transition focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60 " +
  "hover:opacity-90 active:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed";

const defaultMotion = {
  whileTap: { scale: 0.98 },
  whileHover: { y: -1 },
  transition: { duration: 0.15 },
} as const;

export const Button = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  GradientButtonProps
>(function GradientButton(props, ref) {
  // 判定是否为链接
  if ("href" in props && typeof props.href === "string") {
    const { label, className, disabled, onClick, href, ...rest } = props;
    const clickHandler: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      if (disabled) e.preventDefault();
      else onClick?.(e);
    };

    return (
      <motion.a
        {...defaultMotion}
        {...(rest as Omit<HTMLMotionProps<"a">, "children" | "ref">)}
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={clickHandler}
        aria-disabled={disabled || undefined}
        className={
          baseClasses +
          (disabled ? " pointer-events-none" : "") +
          (className ? ` ${className}` : "")
        }
        aria-label={typeof label === "string" ? label : undefined}
      >
        {label}
      </motion.a>
    );
  }

  // 按钮分支
  const {
    label,
    className,
    disabled,
    onClick,
    type = "button",
    ...rest
  } = props as ButtonProps;

  return (
    <motion.button
      {...defaultMotion}
      {...(rest as Omit<HTMLMotionProps<"button">, "children" | "ref">)}
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      className={baseClasses + (className ? ` ${className}` : "")}
      aria-label={typeof label === "string" ? label : undefined}
    >
      {label}
    </motion.button>
  );
});
