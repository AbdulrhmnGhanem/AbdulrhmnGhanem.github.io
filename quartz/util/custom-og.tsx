import { SocialImageOptions } from "./og";
import { formatDate, getDate } from "../components/Date";
import readingTime from "reading-time";
import { i18n } from "../i18n";
import { getFontSpecificationName } from "./theme";

export const customBlogImage: SocialImageOptions["imageStructure"] = ({
  cfg,
  userOpts,
  title,
  description,
  fileData,
  iconBase64,
}) => {
  const { colorScheme } = userOpts;
  const fontBreakPoint = 28;
  const useSmallerFont = title.length > fontBreakPoint;

  // Format date if available
  const rawDate = getDate(cfg, fileData);
  const date = rawDate ? formatDate(rawDate, cfg.locale) : null;

  // Calculate reading time
  const { minutes } = readingTime(fileData.text ?? "");
  const readingTimeText = i18n(cfg.locale).components.contentMeta.readingTime({
    minutes: Math.ceil(minutes),
  });

  // Get tags if available
  const tags = fileData.frontmatter?.tags ?? [];
  const bodyFont = getFontSpecificationName(cfg.theme.typography.body);
  const headerFont = getFontSpecificationName(cfg.theme.typography.header);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
        backgroundColor: cfg.theme.colors[colorScheme].light,
        position: "relative",
      }}
    >
      {/* Left Side - Main Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "3rem",
          justifyContent: "space-between",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {iconBase64 && (
            <img
              src={iconBase64}
              width={48}
              height={48}
              style={{
                borderRadius: "50%",
                border: `3px solid ${cfg.theme.colors[colorScheme].secondary}`,
              }}
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 28,
                color: cfg.theme.colors[colorScheme].secondary,
                fontFamily: headerFont,
                fontWeight: 600,
              }}
            >
              {cfg.pageTitle || "Ghanem's Blog"}
            </div>
            <div
              style={{
                fontSize: 20,
                color: cfg.theme.colors[colorScheme].gray,
                fontFamily: bodyFont,
              }}
            >
              {cfg.baseUrl}
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: useSmallerFont ? 56 : 68,
              fontFamily: headerFont,
              fontWeight: 700,
              color: cfg.theme.colors[colorScheme].dark,
              lineHeight: 1.1,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Description Section */}
        <div
          style={{
            display: "flex",
            marginBottom: "2rem",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 32,
              color: cfg.theme.colors[colorScheme].darkgray,
              lineHeight: 1.4,
              fontFamily: bodyFont,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description}
          </p>
        </div>

        {/* Footer with Metadata */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left side - Date and Reading Time */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              color: cfg.theme.colors[colorScheme].gray,
              fontSize: 24,
              fontFamily: bodyFont,
            }}
          >
            {date && (
              <div style={{ display: "flex", alignItems: "center" }}>
                📅 {date}
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center" }}>
              ⏱️ {readingTimeText}
            </div>
          </div>

          {/* Right side - Tags */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              maxWidth: "50%",
            }}
          >
            {tags.slice(0, 4).map((tag: string, index: number) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  padding: "0.5rem 1rem",
                  backgroundColor: cfg.theme.colors[colorScheme].tertiary,
                  color: cfg.theme.colors[colorScheme].light,
                  borderRadius: "20px",
                  fontSize: 20,
                  fontFamily: bodyFont,
                  fontWeight: 500,
                }}
              >
                #{tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Accent Bar */}
      <div
        style={{
          width: "12px",
          height: "100%",
          background: `linear-gradient(180deg, ${cfg.theme.colors[colorScheme].secondary} 0%, ${cfg.theme.colors[colorScheme].tertiary} 100%)`,
        }}
      />

      {/* Decorative Elements */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: "12px",
          width: "200px",
          height: "200px",
          background: `radial-gradient(circle, ${cfg.theme.colors[colorScheme].tertiary}20 0%, transparent 70%)`,
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: "50px",
          width: "150px",
          height: "150px",
          background: `radial-gradient(circle, ${cfg.theme.colors[colorScheme].secondary}15 0%, transparent 70%)`,
          borderRadius: "50%",
        }}
      />
    </div>
  );
};
