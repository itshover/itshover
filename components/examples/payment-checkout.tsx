"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AlipayIcon from "@/icons/alipay-icon";
import CreditCardIcon from "@/icons/credit-card";
import MastercardIcon from "@/icons/mastercard-icon";
import PaypalIcon from "@/icons/paypal-icon";
import ShieldCheckIcon from "@/icons/shield-check";
import SimpleCheckedIcon from "@/icons/simple-checked-icon";
import VisaIcon from "@/icons/visa-icon";
import type { AnimatedIconHandle, AnimatedIconProps } from "@/icons/types";
import { AnimatePresence, motion } from "motion/react";

type IconComponent = React.ComponentType<
  AnimatedIconProps & React.RefAttributes<AnimatedIconHandle>
>;

export type PaymentMethod = {
  id: string;
  name: string;
  description?: string;
  icon: IconComponent;
  meta?: string;
  disabled?: boolean;
};

export type CheckoutItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity?: number;
};

const formatMoney = (
  amount: number,
  { locale, currency }: { locale: string; currency: string },
) => {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
};

interface PaymentMethodOptionProps {
  method: PaymentMethod;
  inputId: string;
  name: string;
  selected: boolean;
  isAnimated: boolean;
  onSelect: () => void;
}

const PaymentMethodOption = ({
  method,
  inputId,
  name,
  selected,
  isAnimated,
  onSelect,
}: PaymentMethodOptionProps) => {
  const iconRef = useRef<AnimatedIconHandle>(null);
  const Icon = method.icon;

  const handleMouseEnter = () => {
    if (isAnimated) iconRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    if (isAnimated) iconRef.current?.stopAnimation();
  };

  useEffect(() => {
    if (!isAnimated) iconRef.current?.stopAnimation();
  }, [isAnimated]);

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "block",
        method.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
      )}
    >
      <input
        id={inputId}
        type="radio"
        name={name}
        value={method.id}
        checked={selected}
        onChange={onSelect}
        disabled={method.disabled}
        className="sr-only"
      />

      <div
        className={cn(
          "group relative overflow-hidden rounded-xl border transition-all duration-200",
          method.disabled
            ? "bg-muted/30 border-transparent"
            : selected
              ? "bg-gradient-to-r from-primary/8 to-transparent border-primary/60 shadow-sm"
              : "bg-card border-border/30 hover:border-border/60 hover:bg-accent/20",
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {selected && (
          <div className="bg-primary absolute top-0 right-0 z-10 rounded-bl-lg p-1">
            <div className="text-primary-foreground pointer-events-none">
              <SimpleCheckedIcon size={10} />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 p-3">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
              selected
                ? "bg-primary/10"
                : "bg-muted/50 group-hover:bg-muted/80",
            )}
          >
            <Icon
              ref={iconRef}
              size={20}
              className={cn(
                "pointer-events-none transition-colors",
                selected ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
              )}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span
                className={cn(
                  "truncate text-sm font-medium",
                  selected ? "text-primary" : "text-foreground",
                )}
              >
                {method.name}
              </span>
              {method.meta && (
                <span className="text-muted-foreground shrink-0 text-[11px] font-mono tabular-nums">
                  {method.meta}
                </span>
              )}
            </div>
            {method.description && (
              <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                {method.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </label>
  );
};

export interface PaymentCheckoutProps {
  items: CheckoutItem[];
  methods: PaymentMethod[];
  currency?: string;
  locale?: string;
  shipping?: number;
  tax?: number;
  isAnimated?: boolean;
  selectedMethodId?: string;
  defaultSelectedMethodId?: string;
  onSelectedMethodIdChange?: (methodId: string) => void;
  onPay?: (payload: {
    items: CheckoutItem[];
    method: PaymentMethod;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  }) => void | Promise<void>;
  className?: string;
  showSummary?: boolean;
  defaultShowSummary?: boolean;
  onShowSummaryChange?: (show: boolean) => void;
}

export const PaymentCheckout = ({
  items,
  methods,
  currency = "USD",
  locale = "en-US",
  shipping = 0,
  tax = 0,
  isAnimated = true,
  selectedMethodId,
  defaultSelectedMethodId,
  onSelectedMethodIdChange,
  onPay,
  className,
  showSummary,
  defaultShowSummary = false,
  onShowSummaryChange,
}: PaymentCheckoutProps) => {
  const groupId = useId();
  const [uncontrolledSelected, setUncontrolledSelected] = useState<string>(
    defaultSelectedMethodId ?? methods[0]?.id ?? "",
  );
  const [uncontrolledShowSummary, setUncontrolledShowSummary] =
    useState(defaultShowSummary);

  const effectiveSelectedMethodId = selectedMethodId ?? uncontrolledSelected;
  const effectiveShowSummary = showSummary ?? uncontrolledShowSummary;

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      const quantity = item.quantity ?? 1;
      return acc + item.price * quantity;
    }, 0);
  }, [items]);

  const total = subtotal + shipping + tax;

  const selectedMethod =
    methods.find((m) => m.id === effectiveSelectedMethodId) ?? methods[0];

  const handleSelect = (methodId: string) => {
    onSelectedMethodIdChange?.(methodId);
    if (selectedMethodId === undefined) setUncontrolledSelected(methodId);
  };

  const handlePay = async () => {
    if (!selectedMethod || selectedMethod.disabled) return;
    await onPay?.({
      items,
      method: selectedMethod,
      subtotal,
      shipping,
      tax,
      total,
    });
  };

  const toggleSummary = () => {
    const next = !effectiveShowSummary;
    onShowSummaryChange?.(next);
    if (showSummary === undefined) setUncontrolledShowSummary(next);
  };

  return (
    <motion.div
      layout
      className={cn(
        "text-foreground mx-auto w-full p-2",
        effectiveShowSummary ? "max-w-[920px]" : "max-w-[440px]",
        className,
      )}
    >
      <motion.div
        layout
        className="bg-card w-full overflow-hidden rounded-2xl border border-border/50 shadow-lg shadow-black/5"
      >
        <div className="flex flex-col md:flex-row">
          <AnimatePresence initial={false} mode="popLayout">
            {effectiveShowSummary && (
              <motion.div
                key="summary"
                layout
                initial={{
                  opacity: 0,
                  x: 18,
                  clipPath: "inset(0% 0% 0% 100%)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  clipPath: "inset(0% 0% 0% 0%)",
                }}
                exit={{
                  opacity: 0,
                  x: 18,
                  clipPath: "inset(0% 0% 0% 100%)",
                }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-muted/30 p-4 md:w-[54%] md:p-5"
              >
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold tracking-tight">
                      Order Summary
                    </h2>
                    <span className="bg-background/60 text-muted-foreground inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium">
                      {items.length} items
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {items.map((item) => {
                    const quantity = item.quantity ?? 1;
                    const lineTotal = item.price * quantity;

                    return (
                      <div
                        key={item.id}
                        className="group flex items-center justify-between gap-3 rounded-lg bg-background/50 px-3 py-2.5 transition-colors hover:bg-background/80"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium text-foreground">
                            {item.name}
                          </div>
                          <div className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                            {item.description ?? `Qty ${quantity}`}
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <div className="text-sm font-semibold tabular-nums">
                            {formatMoney(lineTotal, { locale, currency })}
                          </div>
                          {quantity > 1 && (
                            <div className="text-muted-foreground text-[11px] tabular-nums">
                              {quantity} × {formatMoney(item.price, { locale, currency })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 space-y-1.5 border-t border-border/30 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium tabular-nums">
                      {formatMoney(subtotal, { locale, currency })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium tabular-nums">
                      {formatMoney(shipping, { locale, currency })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium tabular-nums">
                      {formatMoney(tax, { locale, currency })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border/30 pt-2 mt-2">
                    <span className="text-foreground font-semibold">Total</span>
                    <span className="text-lg font-bold tabular-nums">
                      {formatMoney(total, { locale, currency })}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            layout
            className={cn(
              "bg-card w-full p-4 md:p-5",
              effectiveShowSummary && "md:border-l md:border-border/30",
            )}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-tight">
                  Payment Method
                </h3>
                <p className="text-muted-foreground mt-0.5 text-sm">
                  Select your preferred method
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <div className="text-right">
                  <div className="text-muted-foreground text-[10px] font-medium uppercase tracking-wide">
                    Total
                  </div>
                  <div className="text-xl font-bold tabular-nums">
                    {formatMoney(total, { locale, currency })}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={toggleSummary}
                  className="h-7 rounded-full border-primary/40 bg-primary/5 px-3 text-xs font-medium text-primary hover:bg-primary/10 hover:border-primary/60"
                >
                  {effectiveShowSummary ? "Hide details" : "View details"}
                </Button>
              </div>
            </div>

            <div
              role="radiogroup"
              aria-label="Payment method"
              className="space-y-2"
            >
              {methods.map((method) => {
                const inputId = `${groupId}-${method.id}`;
                const isSelected = effectiveSelectedMethodId === method.id;

                return (
                  <PaymentMethodOption
                    key={method.id}
                    method={method}
                    inputId={inputId}
                    name={groupId}
                    selected={isSelected}
                    isAnimated={isAnimated}
                    onSelect={() => handleSelect(method.id)}
                  />
                );
              })}
            </div>

            <div className="mt-5 space-y-3">
              <Button
                type="button"
                onClick={handlePay}
                disabled={!selectedMethod || selectedMethod.disabled}
                className="h-11 w-full rounded-xl text-sm font-semibold shadow-md transition-shadow hover:shadow-lg"
              >
                Pay {formatMoney(total, { locale, currency })}
              </Button>

              <div className="text-muted-foreground flex items-center justify-center gap-1.5 text-xs">
                <ShieldCheckIcon size={12} className="pointer-events-none" />
                <span>Secure and encrypted</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PaymentCheckoutExample = ({ isAnimated }: { isAnimated?: boolean }) => {
  const sampleItems: CheckoutItem[] = [
    {
      id: "plan",
      name: "Pro Plan",
      description: "Unlimited icons + commercial use",
      price: 19,
      quantity: 1,
    },
    {
      id: "support",
      name: "Priority Support",
      description: "24h response time",
      price: 8,
      quantity: 1,
    },
    {
      id: "templates",
      name: "UI Templates Pack",
      description: "12 premium layouts",
      price: 12,
      quantity: 1,
    },
  ];

  const sampleMethods: PaymentMethod[] = [
    {
      id: "credit-card",
      name: "Credit Card",
      description: "Visa, Mastercard, AmEx",
      icon: CreditCardIcon,
      meta: "•••• 4242",
    },
    {
      id: "visa",
      name: "Visa",
      description: "Fast checkout with Visa",
      icon: VisaIcon,
      meta: "•••• 8888",
    },
    {
      id: "mastercard",
      name: "Mastercard",
      description: "Secure Mastercard payment",
      icon: MastercardIcon,
      meta: "•••• 9999",
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Pay using your wallet",
      icon: PaypalIcon,
    },
    {
      id: "alipay",
      name: "Alipay",
      description: "Scan to pay instantly",
      icon: AlipayIcon,
    },
  ];

  return (
    <PaymentCheckout
      items={sampleItems}
      methods={sampleMethods}
      shipping={4}
      tax={1.5}
      currency="USD"
      isAnimated={isAnimated ?? true}
      defaultSelectedMethodId="credit-card"
      defaultShowSummary={false}
    />
  );
};

export default PaymentCheckoutExample;
